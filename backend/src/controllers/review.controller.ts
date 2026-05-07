import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const postProductReview = async (req: Request, res: Response) => {
  try {
    const { studentId, productId, rating, comment, tags, photo } = req.body;
    
    // Feature 7: Verified buyer check
    const purchaseCount = await prisma.orderItem.count({
      where: { 
        productId,
        order: { studentId, status: 'DELIVERED' }
      }
    });

    if (purchaseCount === 0) {
      return res.status(403).json({ error: 'Only verified buyers can review products' });
    }

    const review = await prisma.review.create({
      data: { studentId, productId, rating, comment, tags, photo },
    });

    // Reward 5 points (Feature 7)
    await prisma.user.update({
      where: { id: studentId },
      data: { loyaltyPoints: { increment: 5 } }
    });

    await prisma.loyaltyHistory.create({
      data: { studentId, points: 5, type: 'EARNED', reason: 'Product Review Reward' }
    });

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post review' });
  }
};

export const upvoteReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    await prisma.review.update({
      where: { id: reviewId },
      data: { upvotes: { increment: 1 } }
    });
    res.json({ message: 'Review upvoted' });
  } catch (error) {
    res.status(500).json({ error: 'Upvote failed' });
  }
};
