import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { 
      studentId, 
      vendorId, 
      items, 
      totalPrice, 
      isSOS, 
      roomNumber, 
      gateCode, 
      urgentFee 
    } = req.body;

    // 1. Create the order
    const order = await prisma.order.create({
      data: {
        studentId,
        vendorId,
        totalPrice,
        isSOS: isSOS || false,
        roomNumber,
        gateCode,
        urgentFee: urgentFee || 0,
        deliveryAddress: roomNumber || 'Hostel',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          })),
        },
      },
    });

    // 2. Loyalty Points Logic (Feature 4 & 10)
    const user = await prisma.user.findUnique({ where: { id: studentId } });
    if (user) {
      let pointsToEarn = Math.floor(totalPrice / 10);
      
      // Prime multiplier (2X)
      if (user.subscription !== 'NONE') pointsToEarn *= 2;

      // Eco Incentive (1.5X) - If any item is expiring soon
      const hasExpiring = items.some((i: any) => i.isExpiringSoon);
      if (hasExpiring) {
        pointsToEarn = Math.floor(pointsToEarn * 1.5);
        await prisma.user.update({
          where: { id: studentId },
          data: { ecoSaverPurchases: { increment: 1 } },
        });
      }

      await prisma.user.update({
        where: { id: studentId },
        data: { loyaltyPoints: { increment: pointsToEarn } },
      });

      await prisma.loyaltyHistory.create({
        data: {
          studentId,
          points: pointsToEarn,
          type: 'EARNED',
          reason: `Order #${order.id.slice(0, 8)} rewards`,
        },
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

export const getOrderHistory = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const orders = await prisma.order.findMany({
      where: { studentId },
      include: {
        items: { include: { product: true } },
        deliveryPerson: { select: { name: true, profilePhoto: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

export const confirmSafety = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    await prisma.order.update({
      where: { id: orderId },
      data: { safetyConfirmed: true },
    });
    res.json({ message: 'Safety confirmed. Thank you!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to confirm safety' });
  }
};
