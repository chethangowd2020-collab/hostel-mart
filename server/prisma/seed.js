const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a Vendor
  const vendorUser = await prisma.user.upsert({
    where: { phone: '9999999999' },
    update: {},
    create: {
      phone: '9999999999',
      name: 'Hostel Mart Store',
      role: 'VENDOR',
      vendorProfile: {
        create: {
          shopName: 'Main Campus Store',
          shopLocation: 'Next to Hostel 12'
        }
      }
    },
    include: { vendorProfile: true }
  });

  const vendorId = vendorUser.vendorProfile.id;

  const products = [
    { name: 'Maggi Noodles (Pack of 12)', price: 156, category: 'Food & Snacks', stock: 50 },
    { name: 'Coca Cola 600ml', price: 40, category: 'Beverages', stock: 100 },
    { name: 'Whisper Ultra Soft (L)', price: 180, category: "Women's Essentials", stock: 30 },
    { name: 'Cello Butterflow Pen (Blue)', price: 10, category: 'Stationery', stock: 200 },
    { name: 'Paracetamol 500mg (10 tabs)', price: 30, category: 'Medicines', stock: 40 },
    { name: 'Dove Shampoo 180ml', price: 160, category: 'Personal Care', stock: 25 },
    { name: 'Extension Cord 3m', price: 350, category: 'Room Essentials', stock: 15 },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        ...p,
        vendorId,
        imageUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${p.name.replace(/\s/g, '')}`
      }
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
