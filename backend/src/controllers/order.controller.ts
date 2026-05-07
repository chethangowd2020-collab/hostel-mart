import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { studentId, items, total, isUrgent, roomDetails } = req.body;
    const order = await prisma.order.create({
      data: {
        userId: studentId,
        total,
        status: 'PENDING',
        isUrgent: isUrgent || false,
        roomDetails: roomDetails || '',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getOrderHistory = async (req: Request, res: Response) => {
  try {
    const studentId = req.params['studentId'] as string;
    const orders = await prisma.order.findMany({
      where: { userId: studentId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const confirmSafety = async (req: Request, res: Response) => {
  try {
    const { orderId, wasSafe, feedback } = req.body;
    const safety = await prisma.safetyConfirmed.create({
      data: {
        orderId,
        wasSafe,
        feedback,
      },
    });
    
    // Update order status if needed
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'DELIVERED' }
    });

    res.json(safety);
  } catch (error) {
    res.status(500).json({ error: 'Failed to confirm safety' });
  }
};
