import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductList } from '../components/product-list/product-list';
import { ShareService } from '../../../shared/service/share-service';
import { map, tap } from 'rxjs';
import { orderResponce } from '../../../shared/shopModel';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private shareService = inject(ShareService);
  private http = inject(HttpClient)


  readonly Orders = toSignal(
    this.getOrders().pipe(
      map(res => res)
    )
  )

  getOrders(){
    return this.http.get<orderResponce[]>("http://localhost:8000/order")
  }

  getOrderById(id:string){
    return this.http.get<orderResponce>(`http://localhost:8000/order/${id}`)
  }

}

