export type BuyProductRequest = {
  products: {
    productId: string;
    amount: number;
  }[];
};
