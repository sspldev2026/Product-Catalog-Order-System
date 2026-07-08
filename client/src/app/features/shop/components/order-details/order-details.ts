import { StickyOffset } from '@angular/cdk/table';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../service/shop-service';
import { order, orderResponce } from '../../../../shared/shopModel';
import { CommonModule } from '@angular/common';
import { ShareService } from '../../../../shared/service/share-service';

@Component({
  selector: 'app-order-details',
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails {
  route = inject(ActivatedRoute)
  orderId = signal<string>("")
  shopService = inject(ShopService)
  order = signal<orderResponce|null>(null)
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderId.set(params.get('id')!);
    });
    this.shopService.getOrderById(this.orderId()).subscribe(
      res => {
        this.order.set(res)
      }

    )
  }
  
}
