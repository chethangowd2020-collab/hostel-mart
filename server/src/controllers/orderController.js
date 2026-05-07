const { prisma, io } = require('../app');

// In-memory store for active group carts
// In production, use Redis
const groupCarts = new Map();

exports.createGroupCart = async (req, res) => {
  const { userId, roomCode } = req.body;
  
  if (groupCarts.has(roomCode)) {
    return res.status(400).json({ error: 'Group cart already exists for this room' });
  }

  groupCarts.set(roomCode, {
    creatorId: userId,
    members: [{ userId, items: [] }],
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  });

  res.json({ message: 'Group cart created', roomCode });
};

exports.joinGroupCart = async (req, res) => {
  const { userId, roomCode } = req.body;
  const cart = groupCarts.get(roomCode);

  if (!cart) {
    return res.status(404).json({ error: 'Group cart not found' });
  }

  if (!cart.members.find(m => m.userId === userId)) {
    cart.members.push({ userId, items: [] });
  }

  res.json({ message: 'Joined group cart', cart });
};

exports.addItemToGroupCart = async (req, res) => {
  const { userId, roomCode, product, quantity } = req.body;
  const cart = groupCarts.get(roomCode);

  if (!cart) return res.status(404).json({ error: 'Cart not found' });

  const member = cart.members.find(m => m.userId === userId);
  if (member) {
    member.items.push({ ...product, quantity });
    // Emit update to all members in the room
    io.to(roomCode).emit('cart_updated', cart);
  }

  res.json(cart);
};

exports.placeOrder = async (req, res) => {
  const { userId, items, totalAmount, isGroupOrder, roomCode } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        studentId: userId,
        totalAmount,
        isGroupOrder,
        roomCode,
        items: {
          create: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            priceAtPurchase: item.price
          }))
        }
      },
      include: { items: true }
    });

    if (isGroupOrder) {
      groupCarts.delete(roomCode);
      io.to(roomCode).emit('order_placed', order);
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Order placement failed' });
  }
};
