// backend/src/controllers/productController.ts
import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const getProducts = async (req: Request, res: Response) => {
  const { category, search } = req.query;
  const where: any = { isActive: true };
  if (category) where.category = category as string;
  if (search) {
    where.OR = [
      { nameAr: { contains: search as string, mode: 'insensitive' } },
      { nameEn: { contains: search as string, mode: 'insensitive' } }
    ];
  }
  const products = await prisma.product.findMany({ where, orderBy: { createdAt: 'desc' } });
  res.json(products);
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { productProviders: { include: { provider: true } } }
  });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};