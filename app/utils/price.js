export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
};

export const getLowestPrice = (prices) => {
  return Math.min(...prices.map((p) => p.price));
};

export const getHighestPrice = (prices) => {
  return Math.max(...prices.map((p) => p.price));
};

export const getPriceDifference = (prices) => {
  const lowest = getLowestPrice(prices);
  const highest = getHighestPrice(prices);
  return highest - lowest;
};
