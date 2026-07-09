import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductList } from '../components/product-list/product-list';
import { ShareService } from '../../../shared/service/share-service';
import { map, tap } from 'rxjs';
import { order, orderResponce } from '../../../shared/shopModel';
import { environment } from '../../../environments/environment.development';
import { Store } from '@ngrx/store';
import { resetCart } from '../../../shared/store/cartState/action.cart';
import { item } from '../components/shoping-store/shoping-store';
import { StickyOffset } from '@angular/cdk/table';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private http = inject(HttpClient)
  private store = inject(Store)
  private shareService = inject(ShareService)
  private router = inject(Router)

  readonly Orders = signal<orderResponce[]>([])

  getOrders() {
    this.http.get<orderResponce[]>(`${environment.apiurl}/order`).subscribe({
      next: (res) => {
        this.Orders.set(res)
      }
    })
  }

  getOrderById(id: string) {
    return this.http.get<orderResponce>(`${environment.apiurl}/order/${id}`)
  }

  createOrder(apiDataSubmiton: {
    customerName: string;
    items: item[];
    paymentMethod: string;
    totalAmount: number;
  }) {
    return this.http.post<order>(
      `${environment.apiurl}/order`,
      apiDataSubmiton
    );
  }

}

