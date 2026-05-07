import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, isSOS, isExpiringSoon, isTrending } = req.query;

    const products = await prisma.product.findMany({
      where: {
        ...(category && { category: String(category) }),
        ...(isSOS === 'true' && { isSOS: true }),
        ...(isExpiringSoon === 'true' && { isExpiringSoon: true }),
        ...(isTrending === 'true' && { isTrending: true }),
      },
      include: {
        reviews: true,
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            student: {
              select: {
                college: { select: { name: true } },
              },
            },
          },
        },
      },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const registerRestockNotify = async (req: Request, res: Response) => {
  try {
    const { productId, studentId } = req.body;
    await prisma.restockNotifier.create({
      data: { productId, studentId },
    });
    res.json({ message: 'You will be notified when this item is back in stock!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register notification' });
  }
};
