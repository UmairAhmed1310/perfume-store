export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  scentFamily: string; // e.g., "Woody", "Floral", "Citrus", "Amber"
  description: string;
  image: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Santale Noir",
    brand: "Essence",
    price: 185,
    scentFamily: "Woody",
    description: "A dark, sophisticated blend of Australian sandalwood, rich papyrus, and spicy cardamom.",
    image: "https://placehold.co/400x500/eae6e1/44403c?text=Santale+Noir",
    featured: true,
  },
  {
    id: "2",
    name: "Pamplemousse Blanc",
    brand: "Essence",
    price: 160,
    scentFamily: "Citrus",
    description: "Crisp white grapefruit layered over crushed mint leaves and a base of clean white musk.",
    image: "https://placehold.co/400x500/eae6e1/44403c?text=Pamplemousse",
    featured: true,
  },
  {
    id: "3",
    name: "Rose de Minuit",
    brand: "Essence",
    price: 195,
    scentFamily: "Floral",
    description: "Midnight damask rose infused with dark patchouli, pink pepper, and a hint of warm honey.",
    image: "https://placehold.co/400x500/eae6e1/44403c?text=Rose+de+Minuit",
    featured: true,
  },
  {
    id: "4",
    name: "Ambre Absolu",
    brand: "Essence",
    price: 210,
    scentFamily: "Amber",
    description: "Rich labdanum, Madagascar vanilla bean, and resinous benzoin wrapped in a veil of sweet smoke.",
    image: "https://placehold.co/400x500/eae6e1/44403c?text=Ambre+Absolu",
    featured: true,
  },
  {
    id: "5",
    name: "Neroli Vague",
    brand: "Essence",
    price: 165,
    scentFamily: "Citrus",
    description: "Sun-drenched Tunisian neroli meeting the salty, mineral crunch of a clean ocean breeze.",
    image: "https://placehold.co/400x500/eae6e1/44403c?text=Neroli+Vague",
    featured: false,
  },
  {
    id: "6",
    name: "Cèdre Fumé",
    brand: "Essence",
    price: 180,
    scentFamily: "Woody",
    description: "Smoky cedarwood, dry vetiver, and leather accords balanced with a touch of fresh bergamot.",
    image: "https://placehold.co/400x500/eae6e1/44403c?text=Cedre+Fume",
    featured: false,
  },
];