import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    const products = await prisma.product.findMany({
      where: {
        category: category ? (category as string) : undefined,
        name: search ? { contains: search as string, mode: 'insensitive' } : undefined,
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params['id'] as string;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { reviews: true },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const registerRestockNotify = async (req: Request, res: Response) => {
  try {
    const { studentId, productId } = req.body;
    const notifier = await prisma.restockNotifier.create({
      data: {
        userId: studentId,
        productId,
      },
    });
    res.json(notifier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register notification' });
  }
};
