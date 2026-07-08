import { Routes } from '@angular/router';
import { ShopingStore } from './features/shop/components/shoping-store/shoping-store';
import { ProductList } from './features/shop/components/product-list/product-list';
import { OrderList } from './features/shop/components/order-list/order-list';
import { OrderDetails } from './features/shop/components/order-details/order-details';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"/shop",
        pathMatch:'full'
    },

    {
        path:"shop",
        component:ShopingStore
    },
    {
        path:"product",
        component:ProductList
    },
    {
        path:"Order",
        component:OrderList,
    },
    {
        path:"Order/:id",
        component:OrderDetails
    }
];
