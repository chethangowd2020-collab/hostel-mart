import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { studentId, productId, currentPrice } = req.body;
    const item = await prisma.wishlistProduct.create({
      data: {
        userId: studentId,
        productId,
        addedPrice: currentPrice,
      },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const studentId = req.params['studentId'] as string;
    if (!studentId) return res.status(400).json({ error: 'Student ID is required' });

    const wishlist = await prisma.wishlistProduct.findMany({
      where: { userId: studentId },
      include: { product: true },
    });
    
    // Feature 11: Logic to flag price drops
    const processed = wishlist.map((item: any) => ({
      ...item,
      hasPriceDrop: item.product.price < item.addedPrice,
      dropAmount: Math.max(0, item.addedPrice - item.product.price),
    }));

    res.json(processed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};
