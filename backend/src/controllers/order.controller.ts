import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { studentId, vendorId, items, total, isUrgent, roomNumber, gateCode, deliveryAddress } = req.body;
    const order = await prisma.order.create({
      data: {
        studentId,
        vendorId: vendorId || studentId, // fallback for demo
        totalPrice: total,
        deliveryAddress: deliveryAddress || 'Hostel Gate',
        roomNumber: roomNumber || null,
        gateCode: gateCode || null,
        isSOS: isUrgent || false,
        urgentFee: isUrgent ? 25 : 0,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          })),
        },
      },
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getOrderHistory = async (req: Request, res: Response) => {
  try {
    const studentId = req.params['studentId'] as string;
    const orders = await prisma.order.findMany({
      where: { studentId },
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
    const { orderId } = req.body;
    // safetyConfirmed is a boolean field on the Order model
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        safetyConfirmed: true,
        status: 'DELIVERED',
      },
    });
    res.json({ message: 'Safety confirmed', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to confirm safety' });
  }
};
