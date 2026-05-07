const { prisma } = require('../app');

exports.getProducts = async (req, res) => {
  const { category, search, sos } = req.query;
  
  try {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          category ? { category } : {},
          search ? { name: { contains: search, mode: 'insensitive' } } : {},
          sos === 'true' ? { category: 'SOS' } : {}
        ]
      },
      include: { vendor: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { vendor: true, reviews: true }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
