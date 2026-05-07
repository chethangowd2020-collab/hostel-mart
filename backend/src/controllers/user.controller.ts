import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { studentId, name, collegeName, hostel, room } = req.body;

    // 1. Ensure College exists
    let college = await prisma.college.upsert({
      where: { name: collegeName || 'SJBIT' },
      update: {},
      create: { name: collegeName || 'SJBIT' }
    });

    // 2. Update User
    const user = await prisma.user.update({
      where: { id: studentId },
      data: {
        name,
        collegeId: college.id,
        hostelName: hostel,
        roomNumber: room,
      },
      include: { college: true }
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        college: {
          include: { academicCalendar: true }
        },
        loyaltyHistory: true,
        roommateGroup: true,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateCollege = async (req: Request, res: Response) => {
  try {
    const { studentId, collegeId } = req.body;
    const user = await prisma.user.update({
      where: { id: studentId },
      data: { collegeId },
      include: { college: { include: { academicCalendar: true } } },
    });
    res.json({ message: 'College synced successfully', college: user.college });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync college' });
  }
};

export const upgradeToPrime = async (req: Request, res: Response) => {
  try {
    const { studentId, plan } = req.body;
    await prisma.user.update({
      where: { id: studentId },
      data: { subscription: plan },
    });
    res.json({ message: `Welcome to Prime ${plan}!` });
  } catch (error) {
    res.status(500).json({ error: 'Prime upgrade failed' });
  }
};
