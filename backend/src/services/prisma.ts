import { PrismaClient } from '@prisma/client';

// DATABASE_URL is injected automatically from environment variables
// (set in Railway/Render dashboard)
const prisma = new PrismaClient();

export default prisma;
