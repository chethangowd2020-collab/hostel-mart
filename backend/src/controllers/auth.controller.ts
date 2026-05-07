import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../services/prisma';

const JWT_SECRET = process.env['JWT_SECRET'] || 'hostelmart_secret_key';

export const register = async (req: Request, res: Response) => {
  try {
    const { phone, password, name, collegeName, hostel, room } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password are required' });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      return res.status(409).json({ error: 'Account with this phone number already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Ensure college exists (defaults to SJBIT)
    const college = await prisma.college.upsert({
      where: { name: collegeName || 'SJBIT' },
      update: {},
      create: { name: collegeName || 'SJBIT' },
    });

    // Create user
    const user = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        name: name || null,
        collegeId: college.id,
        hostelName: hostel || null,
        roomNumber: room || null,
      },
      include: { college: true },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: '30d' });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ token, user: userWithoutPassword, isNewUser: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { phone },
      include: { college: true },
    });

    if (!user || !user.password) {
      return res.status(401).json({ error: 'No account found. Please register first.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: '30d' });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword, isNewUser: false });

  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
