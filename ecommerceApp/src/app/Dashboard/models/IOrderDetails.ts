export interface IOrderDetails {
  id?: string;
  productId: string;
  brand: string;
  name: string;
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
