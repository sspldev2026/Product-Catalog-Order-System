import { createAction, props } from "@ngrx/store";
import { item } from "./reducer.cart";

export const AddToCart = createAction('[Cart] add product', props<{product:item}>());
export const AddToCartSuccess = createAction('[Cart] add product success');

export const removeFromCart = createAction('[Cart] remove product', props<{product:item}>());
export const removeFromCartSuccess = createAction('[Cart] add product success',props);

export const billing = createAction('[Cart] add name payment method', props<{name:string,paymentMethod:"UPI"|"CARD"|"CASH"}>());



// export const setCustomValue = createAction(
//   '[Cart] Set Custom Value',
//   props<{ value: item }>()
// );
