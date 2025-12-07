const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();

  await prisma.menuCategory.createMany({
    data: [
      { name: "Food" },
      { name: "Drink" },
      { name: "Snack" },
      { name: "Dessert" },
      { name: "Other" },
    ],
  });

  const categories = await prisma.menuCategory.findMany();

  const itemsData = [];
  for (let i = 1; i <= 20; i++) {
    const cat = categories[i % categories.length];
    itemsData.push({
      name: `Sample Menu ${i}`,
      price: 10000 + i * 1000,
      categoryId: cat.id,
      image: null,
    });
  }

  await prisma.menuItem.createMany({ data: itemsData });

  console.log("Seeding done");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
