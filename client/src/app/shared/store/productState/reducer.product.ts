import { createReducer, on } from "@ngrx/store";
import { Product } from "../../shopModel";
import { ProductActions } from "./action.product";

export interface ProductState {
  products: Product[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;

  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],

  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 0,

  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.loadProductsSuccess, (state, action) => ({
    ...state,

    products: action.products,
    currentPage: action.currentPage,
    pageSize: action.pageSize,
    totalItems: action.totalItems,
    totalPages: action.totalPages,

    loading: false,
  })),

  on(ProductActions.loadProductsFailure, (state, action) => ({
    ...state,

    loading: false,
    error: action.error,
  }))
);