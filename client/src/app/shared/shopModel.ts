import { offers } from "./service/share-service";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: category;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface category {
  _id: string;
  description: string;
  title: string;
}

export interface ProductListResponse {
  data: Product[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface order {
  productId: Product,
  quantity: number,
  subtotal: number
}

export interface orderResponce {
  _id: string,
  customerName: string,
  items: order[],
  offerIds: offers[],
  totalAmount: 630,
  paymentMethod: string
}
