import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { orderResponce, ProductListResponse } from '../shopModel';
import { toSignal } from '@angular/core/rxjs-interop';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface offers{
        _id: string,
        title: string,
        description: string,
        discountType: string,
        minimumPurchase: number,
        discountValue: number
    }

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  http = inject(HttpClient)
  snakemodule = inject(MatSnackBar)
  
  getProducts(
    page: number = 1,
    pageSize: number = 10,
    name?: string,
    category?: string,
    asc: 1 | -1 = 1
  ) {
    let params = new HttpParams()
      .set('page', page)
      .set('pagesize', pageSize)
      .set('asc', asc);

    if (name) {
      params = params.set('name', name);
    }

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<ProductListResponse>(
      'http://localhost:8000/product',
      { params }
    );
  }

  offers = toSignal<offers[]>(this.getOffers())

  getOffers(){
    return this.http.get<offers[]>("http://localhost:8000/offer")
  }

  showSnake(message:string){
    this.snakemodule.open(message,"close")
  }
}
