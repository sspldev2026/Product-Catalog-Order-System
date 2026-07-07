import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductList } from '../components/product-list/product-list';
import { ShareService } from '../../../shared/service/share-service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private shareService = inject(ShareService);

  readonly shopProducts = toSignal(
    this.shareService.getProducts().pipe(
      tap(res=>console.log(res.data)),
      map(res => res.data)
    ),
    {
      initialValue: [],
    }
  );

}

