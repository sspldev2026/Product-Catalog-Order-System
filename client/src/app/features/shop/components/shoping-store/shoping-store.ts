import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSelect, MatOption } from "@angular/material/select";
import { category, Product, ProductListResponse } from '../../../../shared/shopModel';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddToCart, billing } from '../../../../shared/store/cartState/action.cart';
import { ProductState } from '../../../../shared/store/productState/reducer.product';
import { selectCartItems, selectCartState, selectItemCount, selectTotalAmount } from '../../../../shared/store/cartState/selector.cart';
import { selectProducts, selectTotalItems } from '../../../../shared/store/productState/selector.product';
import { ProductActions } from '../../../../shared/store/productState/action.product';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';

export interface item {
  productName?: string;
  productId: string;
  quantity: number;
  subtotal: number;
  price: number;
}

@Component({
  selector: 'app-shoping-store',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatPaginator,
    MatSelect,
    MatOption,
    MatTableModule,
    MatCheckboxModule,
    MatListModule
  ],
  templateUrl: './shoping-store.html',
  styleUrl: './shoping-store.css',
})
export class ShopingStore {

  http = inject(HttpClient)
  private _formBuilder = inject(FormBuilder);
  private store = inject(Store)

  searchSubject = new Subject<string>()

  cart = this.store.selectSignal(selectCartItems)
  cartState = this.store.selectSignal(selectCartState)
  totalAmount = this.store.selectSignal(selectTotalAmount)
  totalProducts = this.store.selectSignal(selectItemCount)

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [this.cartState().customerName, Validators.required],
    paymentMethod: this._formBuilder.control<'CASH' | 'UPI' | 'CARD'>(this.cartState().paymentMethod)
  });
  isLinear = false;

  filters = signal({
    page: 1,
    pageSize: 10,
    category: '',
    name: ''
  });


  productList = this.store.selectSignal(selectProducts)
  category = signal<category[]>([])
  dataSource = new MatTableDataSource<item>();



  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts(this.filters()))
    this.dataSource.data = this.cart()

    this.http.get<category[]>("http://localhost:8000/category").subscribe((res) => {
      console.log(res)
      this.category.set(res)
    })
  }

  constructor() {
    effect(() => {
      this.dataSource.data = this.cart()
    })
  }

  displayedColumns: string[] = ['product', 'quantity', 'price', 'subtotal'];

  addToCartHandler(product: Product) {
    let payload: item = {
      productName: product.name,
      productId: product._id,
      quantity: 1,
      price: product.price,
      subtotal: product.price,
    }
    this.store.dispatch(AddToCart({ product: payload }))
    console.log(this.cartState())
    this.dataSource.data = this.cart()
  }

  onBilling() {

    this.store.dispatch(
      billing({
        name: this.secondFormGroup.value.secondCtrl!,
        paymentMethod: this.secondFormGroup.value.paymentMethod!
      })
    );
    console.log(this.cartState())
  }

}
