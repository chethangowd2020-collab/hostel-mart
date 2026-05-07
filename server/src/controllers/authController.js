const { prisma } = require('../app');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Mock OTP storage (in production use Redis or DB)
const otpStore = new Map();

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, otp);

  console.log(`OTP for ${phone}: ${otp}`); // Log to console for development
  
  res.json({ message: 'OTP sent successfully', otp }); // Returning OTP for ease of testing
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  
  if (otpStore.get(phone) !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  otpStore.delete(phone);

  let user = await prisma.user.findUnique({
    where: { phone },
    include: { studentProfile: true, deliveryProfile: true, vendorProfile: true }
  });

  if (!user) {
    return res.json({ message: 'New user, registration required', isNewUser: true, phone });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
  res.json({ token, user, isNewUser: false });
};

exports.registerStudent = async (req, res) => {
  const { name, phone, collegeName, hostelName, roomNumber, gender, roommates } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        phone,
        role: 'STUDENT',
        studentProfile: {
          create: {
            collegeName,
            hostelName,
            roomNumber,
            gender,
            roomCode: Math.random().toString(36).substring(7).toUpperCase()
          }
        }
      },
      include: { studentProfile: true }
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};
