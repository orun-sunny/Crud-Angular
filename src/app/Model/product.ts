export interface ProductModel {
  id: number;
  productName: string;
  price: number | string;
  description: string;
  rating: number;
  status: boolean | string;
}
