export interface IOrderDetails {
  id?: string;
  userName: string;
  productId: string;
  brand: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
  totalAmount: number;
  paymentType: string;
  address: string;
  dateOfOrder: Date;
  status: string;
  dateOfShipped?: Date;
  dateOfDelivered?: Date;
}

export interface IUserOrderDetails {
  userId: string;
  orders: IOrderDetails[];
}

