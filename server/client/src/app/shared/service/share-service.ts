import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductListResponse } from '../shopModel';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  http = inject(HttpClient)
  
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
}
