import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Icart } from "./reducer.cart";

export const selectCartState =
  createFeatureSelector<Icart>('cart');

export const selectCart = createSelector(
  selectCartState,
  (state) => state
);

export const selectCartItems = createSelector(
    selectCartState,
    (state)=>state.items
)

export const selectItemCount = createSelector(
    selectCartState,
    (state)=>state.totalProduct
)

export const selectTotalAmount = createSelector(
    selectCartState,
    (state)=>state.totalAmount
)

export const selectName = createSelector(
    selectCartState,
    (state)=>state.customerName
)

export const selectFormValues = createSelector(
    selectCartState,
    (state)=>({
      customerName:state.customerName,
      items:state.items,
      paymentMethod:state.paymentMethod,
      totalAmount:state.totalAmount
    })
)