const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateNearExpiryProducts() {
  const now = new Date();
  const products = await prisma.product.findMany({
    where: {
      expiryDate: {
        not: null,
        lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // Within 7 days
      }
    }
  });

  for (const product of products) {
    const diffTime = Math.abs(product.expiryDate - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let discount = 0;
    if (diffDays <= 1) discount = 0.7;
    else if (diffDays <= 3) discount = 0.5;
    else if (diffDays <= 5) discount = 0.35;
    else if (diffDays <= 7) discount = 0.2;

    if (discount > 0) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          isNearExpiry: true,
          discountPrice: product.price * (1 - discount)
        }
      });
    }
  }

  console.log(`Updated ${products.length} products for near-expiry discounts.`);
}

if (require.main === module) {
  updateNearExpiryProducts()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
}

module.exports = updateNearExpiryProducts;
