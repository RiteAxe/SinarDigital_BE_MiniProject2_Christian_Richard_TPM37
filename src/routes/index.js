const express = require("express");
const router = express.Router();
const path = require("path");
const prisma = require("../utils/prismaClient");

router.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>${req.appName}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { margin-bottom: 10px; }
          a { display: inline-block; margin-right: 10px; }
        </style>
      </head>
      <body>
        <h1>${req.appName}</h1>
        <a href="/order">Buat Pesanan</a>
        <a href="/orders">Lihat Pesanan</a>
      </body>
    </html>
  `);
});

router.get("/order", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Buat Pesanan - ${req.appName}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          input, textarea { width: 250px; padding: 6px; }
          button { padding: 8px 16px; }
        </style>
      </head>
      <body>
        <h1>Buat Pesanan</h1>
        <form method="POST" action="/api/orders">
          <label>Nama:</label><br/>
          <input type="text" name="name" required/><br/><br/>

          <label>Menu:</label><br/>
          <input type="text" name="menu" required/><br/><br/>

          <label>Jumlah:</label><br/>
          <input type="number" name="quantity" min="1" required/><br/><br/>

          <label>Catatan:</label><br/>
          <textarea name="note"></textarea><br/><br/>

          <button type="submit">Kirim</button>
        </form>

        <br/>
        <a href="/">Kembali</a>
      </body>
    </html>
  `);
});

router.get("/orders", async (req, res) => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  const listItems = orders.length
    ? orders
        .map(
          (o, i) => `
        <li>
          <strong>${o.name}</strong> pesan ${o.quantity} × ${o.menu}<br/>
          <small>${o.note || ""}</small>
        </li>
        `
        )
        .join("")
    : "<li>Belum ada pesanan.</li>";

  res.send(`
    <html>
      <head>
        <title>Daftar Pesanan - ${req.appName}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          li { margin-bottom: 8px; }
        </style>
      </head>
      <body>
        <h1>Daftar Pesanan</h1>
        <ul>${listItems}</ul>
        <a href="/">Kembali</a>
      </body>
    </html>
  `);
});

module.exports = router;
