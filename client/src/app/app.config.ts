import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { productEffects } from './shared/store/productState/effect.product';
import { provideStore } from '@ngrx/store';
import { productReducer } from './shared/store/productState/reducer.product';
import { cartReducer } from './shared/store/cartState/reducer.cart';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners()
    , provideRouter(routes)
    , provideStore({
      products: productReducer,
      cart:cartReducer
    })
    , provideEffects(productEffects)
  ],
};
