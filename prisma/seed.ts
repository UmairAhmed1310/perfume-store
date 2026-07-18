import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Santale Noir",
        brand: "Essence",
        price: 185,
        scentFamily: "Woody",
        description: "A dark, sophisticated blend of Australian sandalwood, rich papyrus, and spicy cardamom.",
        image: "https://placehold.co/400x500/eae6e1/44403c?text=Santale+Noir",
        featured: true,
      },
      {
        name: "Pamplemousse Blanc",
        brand: "Essence",
        price: 160,
        scentFamily: "Citrus",
        description: "Crisp white grapefruit layered over crushed mint leaves and a base of clean white musk.",
        image: "https://placehold.co/400x500/eae6e1/44403c?text=Pamplemousse",
        featured: true,
      },
      {
        name: "Rose de Minuit",
        brand: "Essence",
        price: 195,
        scentFamily: "Floral",
        description: "Midnight damask rose infused with dark patchouli, pink pepper, and a hint of warm honey.",
        image: "https://placehold.co/400x500/eae6e1/44403c?text=Rose+de+Minuit",
        featured: true,
      },
      {
        name: "Ambre Absolu",
        brand: "Essence",
        price: 210,
        scentFamily: "Amber",
        description: "Rich labdanum, Madagascar vanilla bean, and resinous benzoin wrapped in a veil of sweet smoke.",
        image: "https://placehold.co/400x500/eae6e1/44403c?text=Ambre+Absolu",
        featured: true,
      },
      {
        name: "Neroli Vague",
        brand: "Essence",
        price: 165,
        scentFamily: "Citrus",
        description: "Sun-drenched Tunisian neroli meeting the salty, mineral crunch of a clean ocean breeze.",
        image: "https://placehold.co/400x500/eae6e1/44403c?text=Neroli+Vague",
        featured: false,
      },
      {
        name: "Cèdre Fumé",
        brand: "Essence",
        price: 180,
        scentFamily: "Woody",
        description: "Smoky cedarwood, dry vetiver, and leather accords balanced with a touch of fresh bergamot.",
        image: "https://placehold.co/400x500/eae6e1/44403c?text=Cedre+Fume",
        featured: false,
      },
    ],
  });
  console.log("Seeded 6 products.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });