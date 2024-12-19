export const groceryProducts = [
  {
    id: 1,
    name: "Organic Bananas",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500",
    category: "Fruits",
    prices: [
      { store: "Walmart", price: 2.99, inStock: true },
      { store: "Target", price: 3.29, inStock: true },
      { store: "Whole Foods", price: 3.99, inStock: true },
      { store: "Kroger", price: 3.49, inStock: false },
    ],
    priceHistory: {
      Walmart: [
        { date: "2024-01-01", price: 3.29 },
        { date: "2024-02-01", price: 3.19 },
        { date: "2024-03-01", price: 2.99 },
        { date: "2024-04-01", price: 2.99 },
      ],
      Target: [
        { date: "2024-01-01", price: 3.49 },
        { date: "2024-02-01", price: 3.39 },
        { date: "2024-03-01", price: 3.29 },
        { date: "2024-04-01", price: 3.29 },
      ],
      "Whole Foods": [
        { date: "2024-01-01", price: 4.29 },
        { date: "2024-02-01", price: 4.19 },
        { date: "2024-03-01", price: 3.99 },
        { date: "2024-04-01", price: 3.99 },
      ],
      Kroger: [
        { date: "2024-01-01", price: 3.69 },
        { date: "2024-02-01", price: 3.59 },
        { date: "2024-03-01", price: 3.49 },
        { date: "2024-04-01", price: 3.49 },
      ],
    },
  },
  {
    id: 2,
    name: "Whole Milk",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500",
    category: "Dairy",
    prices: [
      { store: "Walmart", price: 3.49, inStock: true },
      { store: "Target", price: 3.59, inStock: true },
      { store: "Whole Foods", price: 4.29, inStock: true },
      { store: "Kroger", price: 3.39, inStock: true },
    ],
    priceHistory: {
      Walmart: [
        { date: "2024-01-01", price: 3.69 },
        { date: "2024-02-01", price: 3.59 },
        { date: "2024-03-01", price: 3.49 },
        { date: "2024-04-01", price: 3.49 },
      ],
      Target: [
        { date: "2024-01-01", price: 3.79 },
        { date: "2024-02-01", price: 3.69 },
        { date: "2024-03-01", price: 3.59 },
        { date: "2024-04-01", price: 3.59 },
      ],
      "Whole Foods": [
        { date: "2024-01-01", price: 4.49 },
        { date: "2024-02-01", price: 4.39 },
        { date: "2024-03-01", price: 4.29 },
        { date: "2024-04-01", price: 4.29 },
      ],
      Kroger: [
        { date: "2024-01-01", price: 3.59 },
        { date: "2024-02-01", price: 3.49 },
        { date: "2024-03-01", price: 3.39 },
        { date: "2024-04-01", price: 3.39 },
      ],
    },
  },
];
