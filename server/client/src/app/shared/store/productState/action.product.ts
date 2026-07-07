import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../shopModel';

export const ProductActions = createActionGroup({
  source: 'Products',

  events: {
    'Load Products': props<{
      name?:string;
      category?:string;
      page: number;
      pageSize: number;
    }>(),

    'Load Products Success': props<{
      products: Product[];
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    }>(),

    'Load Products Failure': props<{
      error: string;
    }>(),
  },
});