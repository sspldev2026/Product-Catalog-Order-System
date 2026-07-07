import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { ShareService } from '../../service/share-service';
import { ProductActions } from './action.product';


@Injectable()
export class productEffects {
  private actions$ = inject(Actions);
  private shareService = inject(ShareService);

loadProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.loadProducts),

    switchMap(({ page, pageSize, category ,name}) =>
      this.shareService.getProducts(page, pageSize,name, category).pipe(

        map((response) =>
          ProductActions.loadProductsSuccess({
            products: response.data,
            currentPage: response.currentPage,
            pageSize: response.pageSize,
            totalItems: response.totalItems,
            totalPages: response.totalPages,
          })
        ),

        catchError(() =>
          of(
            ProductActions.loadProductsFailure({
              error: 'Unable to load products',
            })
          )
        )
      )
    )
  )
);}