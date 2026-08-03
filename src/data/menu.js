export const categories = [
  { id: 'all', name: 'All Dishes' },
  { id: 'sandwiches-burgers', name: 'Sandwiches & Burgers' },
  { id: 'pizza-bites', name: 'Pizza & Fast Bites' },
  { id: 'breakfast-specials', name: 'Breakfast Specials' },
  { id: 'beverages', name: 'Tea, Coffee & Shakes' }
];

export const menuItems = [
  {
    id: 1,
    name: "Classic Veg Cheese Grilled Sandwich",
    description: "Double layered toasted bread stuffed with fresh cucumbers, tomatoes, capsicum, mint chutney, and melted mozzarella cheese.",
    price: 90,
    category: "sandwiches-burgers",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: true
  },
  {
    id: 2,
    name: "Crispy Veg Supreme Burger",
    description: "Handcrafted crunchy vegetable patty topped with melted cheese slice, crisp lettuce, tomatoes, and signature mayo in toasted sesame buns.",
    price: 80,
    category: "sandwiches-burgers",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: false
  },
  {
    id: 3,
    name: "Double Cheese Paneer Pizza",
    description: "Crispy thin crust pizza loaded with marinated paneer cubes, sweet corn, bell peppers, extra mozzarella cheese, and Italian herbs.",
    price: 140,
    category: "pizza-bites",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: true
  },
  {
    id: 4,
    name: "Peri Peri Crispy French Fries",
    description: "Golden crispy potato fries tossed in fiery house peri peri seasoning, served hot with creamy garlic mayo dip.",
    price: 70,
    category: "pizza-bites",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: false
  },
  {
    id: 5,
    name: "Special Kulhad Ginger Chai",
    description: "Strongly brewed tea infused with crushed ginger and cardamom, served piping hot in traditional clay kulhad cups.",
    price: 25,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: true
  },
  {
    id: 6,
    name: "Classic Cold Coffee with Ice Cream",
    description: "Rich espresso shot blended with chilled thick milk, topped with a scoop of vanilla ice cream and dark chocolate drizzle.",
    price: 80,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: false
  },
  {
    id: 7,
    name: "Steamed Veg Momos (8 Pcs)",
    description: "Delicate steamed dumplings filled with finely minced cabbage, carrots, and bell peppers, served with spicy red chilli sauce.",
    price: 90,
    category: "pizza-bites",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    isVeg: true,
    isPopular: false,
    isChefRecommendation: true
  },
  {
    id: 8,
    name: "Special Kanda Poha",
    description: "Fluffy flattened rice flakes cooked with onions, mustard seeds, curry leaves, and crunchy peanuts, topped with fresh coriander.",
    price: 35,
    category: "breakfast-specials",
    image: "/poha.jpg",
    rating: 4.7,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: false
  },
  {
    id: 9,
    name: "Mumbai Cheese Vada Pav",
    description: "Golden fried spiced potato dumpling stuffed in soft pav, layered with melted cheese slice and garlic red chutney.",
    price: 40,
    category: "breakfast-specials",
    image: "/vadapav.png",
    rating: 4.8,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: false
  },
  {
    id: 10,
    name: "Thick Chocolate Oreo Shake",
    description: "Chilled milk blended with chocolate ice cream and crushed Oreo cookies, topped with chocolate syrup and cookie crumbles.",
    price: 90,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: true
  },
  {
    id: 11,
    name: "Crispy Masala Dosa",
    description: "Thin golden rice crepe stuffed with mild-spiced potato mash, served with hot vegetable sambhar and fresh coconut chutney.",
    price: 70,
    category: "breakfast-specials",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: false,
    isChefRecommendation: false
  },
  {
    id: 12,
    name: "Spicy Misal Pav",
    description: "Spicy sprouted moth bean curry topped with crunchy farsan, chopped onions, and lemon, served with two soft butter pavs.",
    price: 65,
    category: "breakfast-specials",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    isVeg: true,
    isPopular: true,
    isChefRecommendation: true
  }
];
