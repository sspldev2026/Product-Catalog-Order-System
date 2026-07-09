import { Component, inject, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShopService } from '../../service/shop-service';
import { Product } from '../../../../shared/shopModel';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  imports: [MatListModule, MatDividerModule, CommonModule, MatIcon,MatButton],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList {
  shopService = inject(ShopService)
  router = inject(Router)

  ngOnInit(){
    this.shopService.getOrders()
  }

  OrderDetailPage(id:string){
    this.router.navigate([`Order/${id}`])
  }
}
