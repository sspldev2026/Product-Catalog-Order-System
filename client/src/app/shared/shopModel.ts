export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: category;
  brand?: string;
  image?: string;
  images?: string;
  rating?: number;
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
