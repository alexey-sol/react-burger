export type CreateOrderRequest = {
  ingredients: string[];
};

export type CreateOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};
