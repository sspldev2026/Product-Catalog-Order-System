import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./reducer.product";

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectCurrentPage = createSelector(
  selectProductState,
  (state) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectProductState,
  (state) => state.totalPages
);

export const selectTotalItems = createSelector(
  selectProductState,
  (state) => state.totalItems
);

export const selectPageSize = createSelector(
  selectProductState,
  (state) => state.pageSize
);