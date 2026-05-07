import { Request, Response } from 'express';
import prisma from '../services/prisma';
import { sendSMS } from '../services/sms.service';
import crypto from 'crypto';

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number is required' });

    // 1. Generate 6-digit OTP
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    // 2. Save or Update in DB
    await prisma.oTP.upsert({
      where: { phone },
      update: { code, expiresAt },
      create: { phone, code, expiresAt },
    });

    // 3. Send via SMS Service
    await sendSMS(phone, `Your Hostel Mart verification code is: ${code}`);

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { phone, code } = req.body;

    const otpRecord = await prisma.oTP.findUnique({
      where: { phone }
    });

    if (!otpRecord || otpRecord.code !== code) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ error: 'OTP expired. Please request a new one.' });
    }

    // Success: Check if user already exists
    let user = await prisma.user.findUnique({
      where: { phone },
      include: { college: true }
    });

    // Clean up OTP after use
    await prisma.oTP.delete({ where: { phone } });

    res.json({
      message: 'Verified successfully',
      isNewUser: !user,
      user
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
};
