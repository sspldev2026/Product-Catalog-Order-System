import { createReducer, on } from "@ngrx/store";
import { AddToCart, AddToCartSuccess, billing, removeFromCart } from "./action.cart";

export interface item {
    productName?:string;
    productId: string;
    quantity: number;
    price:number;
    subtotal: number;
}

export interface Icart {
    customerName: string;
    totalProduct:number;
    totalAmount: number;
    items: item[]
    paymentMethod: "CASH" | "UPI" | "CARD"

}

const initialCartState: Icart = {
    customerName: "",
    totalProduct:0,
    totalAmount: 0,
    items: [],
    paymentMethod: "CASH"

}

export const cartReducer = createReducer(
    initialCartState,
    on(AddToCart, (state, { product }) => {
        const isProductInCart = state.items.find(res => res.productId === product.productId)
        if (isProductInCart !== undefined) {
            return {
                ...state,
                items: state.items.map(item=>
                    item.productId === product.productId ?
                    {
                        ...item,
                        quantity:item.quantity+1,
                        subtotal:item.subtotal+item.price
                    }:item
                ),
                totalProduct:state.totalProduct+product.quantity,
                totalAmount:state.totalAmount+product.price
            }
        }
        return {
            ...state,
            items: [...state.items, product],
            totalProduct:state.totalProduct+product.quantity,
            totalAmount:state.totalAmount+((product.quantity)*product.price)
        }
    }),
    on(removeFromCart,(state,{productId})=>{
        return {
            ...state,
            items:state.items.filter(res=>res.productId !== productId),
            totalProduct:state.totalProduct-1,
        }
    }),
    on(billing,(state,{name,paymentMethod})=>({
            ...state,
            customerName:name,
            paymentMethod:paymentMethod
    })),

)