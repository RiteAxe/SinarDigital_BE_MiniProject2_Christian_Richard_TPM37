const prisma = require("../utils/prismaClient");

const createOrder = async (req, res, next) => {
  try {
    const { name, menu, quantity, note } = req.body;

    const order = await prisma.order.create({
      data: {
        name,
        menu,
        quantity: Number(quantity),
        note,
      },
    });

    return res.redirect("/orders");
  } catch (err) {
    next(err);
  }
};

const getOrdersApi = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      status: "success",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

const renderOrdersPage = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    const listItems = orders
      .map(
        (o) => `
        <li>
          <strong>${o.name}</strong> - ${o.menu} (${o.quantity})<br/>
          <small>${o.note || ""}</small>
        </li>
      `
      )
      .join("");

    const html = `
      <html>
        <head>
          <title>Daftar Pesanan - ${req.appName || "QuickQanteen"}</title>
        </head>
        <body>
          <h1>Daftar Pesanan</h1>
          <a href="/order">Buat Pesanan Baru</a>
          <ul>
            ${orders.length ? listItems : "<li>Belum ada pesanan</li>"}
          </ul>
        </body>
      </html>
    `;

    return res.send(html);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getOrdersApi,
  renderOrdersPage,
};
