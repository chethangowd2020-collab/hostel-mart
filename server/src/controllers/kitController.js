const kits = {
  exam: {
    name: 'Exam Kit',
    price: 499,
    items: [
      { name: 'Ballpoint pens (5 pack)', price: 50 },
      { name: 'Highlighters (4 colors)', price: 120 },
      { name: 'Sticky notes (2 pads)', price: 60 },
      { name: 'A4 Ruled notebook', price: 80 },
      { name: 'Instant coffee (5 pack)', price: 50 },
      { name: 'Dark chocolate', price: 100 },
    ],
    discount: 0.1
  },
  women: {
    name: "Women's Essentials",
    price: 899,
    items: [
      { name: 'Sanitary pads (10 pack)', price: 150 },
      { name: 'Pantyliners (20 pack)', price: 100 },
      { name: 'Pain relief roll-on', price: 200 },
      { name: 'Dark chocolate', price: 100 },
      { name: 'Wet wipes', price: 80 },
    ],
    discount: 0.12
  }
};

exports.getKits = (req, res) => {
  res.json(kits);
};

exports.getKitByName = (req, res) => {
  const { name } = req.params;
  const kit = kits[name.toLowerCase()];
  if (!kit) return res.status(404).json({ error: 'Kit not found' });
  res.json(kit);
};
