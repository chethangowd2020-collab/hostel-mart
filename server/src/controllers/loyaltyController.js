const { prisma } = require('../app');

exports.getLoyaltyPoints = async (req, res) => {
  const { userId } = req.params;
  try {
    const points = await prisma.loyaltyPoint.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(points);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch points' });
  }
};

exports.subscribePrime = async (req, res) => {
  const { userId, plan } = req.body; // plan: MONTHLY, SEMESTER, ANNUAL
  
  let duration = 30;
  if (plan === 'SEMESTER') duration = 180;
  if (plan === 'ANNUAL') duration = 365;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + duration);

  try {
    const profile = await prisma.studentProfile.update({
      where: { userId },
      data: {
        subscriptionStatus: plan,
        subscriptionEnd: expiryDate
      }
    });
    res.json({ message: `Subscribed to ${plan}`, profile });
  } catch (error) {
    res.status(500).json({ error: 'Subscription failed' });
  }
};
