const generateOrderId = (orders = []) => {
  if (!orders.length) return 1;
  const ids = orders.map((o) => o.id || 0);
  return Math.max(...ids) + 1;
};

module.exports = { generateOrderId };
