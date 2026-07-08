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
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddToCart, billing, removeFromCart, resetCart } from '../../../../shared/store/cartState/action.cart';
import { selectCartItems, selectCartState, selectFormValues, selectItemCount, selectName, selectTotalAmount } from '../../../../shared/store/cartState/selector.cart';
import { selectCurrentPage, selectProducts, selectTotalItems, selectTotalPages } from '../../../../shared/store/productState/selector.product';
import { ProductActions } from '../../../../shared/store/productState/action.product';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import { A11yModule } from "@angular/cdk/a11y";
import { CommonModule } from '@angular/common';
import { ShareService } from '../../../../shared/service/share-service';
import { Router } from '@angular/router';

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
    MatSelect,
    MatOption,
    MatTableModule,
    MatCheckboxModule,
    MatListModule,
    A11yModule,
    CommonModule
],
  templateUrl: './shoping-store.html',
  styleUrl: './shoping-store.css',
})
export class ShopingStore {

  http = inject(HttpClient)
  private _formBuilder = inject(FormBuilder);
  private store = inject(Store)

  searchSubject = new Subject<string>()
  shareService = inject(ShareService)
  router = inject(Router)

  cart = this.store.selectSignal(selectCartItems)
  cartState = this.store.selectSignal(selectCartState)
  totalAmount = this.store.selectSignal(selectTotalAmount)
  totalProducts = this.store.selectSignal(selectItemCount)
  customerName = this.store.selectSignal(selectName)
  apiDataSubmiton = this.store.selectSignal(selectFormValues)
  currentPage = this.store.selectSignal(selectCurrentPage)
  totalPage = this.store.selectSignal(selectTotalPages)

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
    this.dataSource.data = this.cart()

    this.http.get<category[]>("http://localhost:8000/category").subscribe((res) => {
      console.log(res)
      console.log(this.cartState())
      this.category.set(res)
    })

    this.searchSubject.pipe(
          debounceTime(500),
          distinctUntilChanged()
        ).subscribe(name => {
    
          this.filters.update(f => ({
            ...f,
            name,
            page: 1
          }));
    
        });
  }

  constructor() {
    effect(() => {
      this.dataSource.data = this.cart()
    })

    effect(() => {
      this.store.dispatch(ProductActions.loadProducts(this.filters()))
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

  removeFromCartHandler(product:item){
      this.store.dispatch(removeFromCart({product}))
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

  onSubmit(){
    this.http.post("http://localhost:8000/order",this.apiDataSubmiton()).subscribe({
      next:(res)=>{
        this.shareService.showSnake("Order Has been placed")
        this.store.dispatch(resetCart())
        this.router.navigate(["/Order"])
      }
    })
  }

  onCategoryChange(category: string) {
    this.filters.update(f => ({
      ...f,
      category,
      page: 1
    }));
  }

  onSearch(name: string) {
    this.searchSubject.next(name);
  }

  onPageSizeChange(pageSize: number) {
    this.filters.update(f => ({
      ...f,
      pageSize,
      page: 1
    }));
  }

  onNextPage(page: number) {
    this.filters.update(f => ({
      ...f,
      page
    }));
  }

}
