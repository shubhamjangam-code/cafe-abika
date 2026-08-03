export const categories = [
  { id: 'all', name: 'All Breakfast' },
  { id: 'south-indian', name: 'South Indian' },
  { id: 'maharashtrian', name: 'Maharashtrian' },
  { id: 'north-indian', name: 'North Indian' },
  { id: 'beverages', name: 'Tea & Beverages' }
];

export const menuItems = [
  {
    id: 1,
    name: "Steamed Idli Sambhar",
    description: "Three soft, fluffy steamed rice cakes served with aromatic piping hot vegetable sambhar and coconut chutney.",
    price: 50,
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: false
  },
  {
    id: 2,
    name: "Crispy Masala Dosa",
    description: "Thin golden rice crepe stuffed with mild-spiced potato mash, served with sambhar and coconut chutney.",
    price: 70,
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: true
  },
  {
    id: 3,
    name: "Kanda Poha",
    description: "Fluffy flattened rice flakes cooked with onions, mustard seeds, curry leaves, and peanuts, topped with fresh coriander.",
    price: 35,
    category: "maharashtrian",
    image: "/poha.jpg",
    rating: 4.7,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: false
  },
  {
    id: 4,
    name: "Aloo Paratha (Curd & Butter)",
    description: "Whole wheat flatbread stuffed with spiced potato filling, cooked with ghee and served with fresh curd and butter.",
    price: 60,
    category: "north-indian",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    isVeg: true,
    isPopular: false,
    isChefRecommendation: true
  },
  {
    id: 5,
    name: "Special Chole Bhature",
    description: "Two puffed, golden-fried leavened flatbreads served with spicy chickpea curry, sliced onions, and pickle.",
    price: 80,
    category: "north-indian",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: false
  },
  {
    id: 6,
    name: "Mumbai Vada Pav",
    description: "Golden fried spiced potato dumpling stuffed inside a soft sliced pav, smeared with garlic and green chutneys.",
    price: 30,
    category: "maharashtrian",
    image: "/vadapav.png",
    rating: 4.8,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: false
  },
  {
    id: 7,
    name: "Spicy Misal Pav",
    description: "Spicy sprouted moth bean curry topped with sev, farsan, chopped onions, and lemon, served with two soft pavs.",
    price: 65,
    category: "maharashtrian",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: false,
    isChefRecommendation: true
  },
  {
    id: 8,
    name: "Semolina Upma",
    description: "Thick savory porridge cooked from dry-roasted semolina, tempered with mustard seeds, curry leaves, and green peas.",
    price: 40,
    category: "south-indian",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
    rating: 4.6,
    isVeg: true,
    isPopular: false,
    isChefRecommendation: false
  },
  {
    id: 9,
    name: "Sabudana Khichdi",
    description: "Spiced tapioca pearls cooked with roasted peanut crush, potato cubes, green chillies, and cumin seeds.",
    price: 55,
    category: "maharashtrian",
    image: "/sabudana.jpg",
    rating: 4.7,
    isVeg: true,
    isPopular: false,
    isChefRecommendation: false
  },
  {
    id: 10,
    name: "Ginger Chai & Bun Maska",
    description: "A cup of freshly brewed hot ginger-cardamom tea served with a soft bun loaded with fresh maska (butter).",
    price: 45,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: true
  }
];
