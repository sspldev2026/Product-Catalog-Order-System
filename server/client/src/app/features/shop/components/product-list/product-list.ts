import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild, AfterViewInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';



import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel, MatSelect, MatOption } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { category, Product } from '../../../../shared/shopModel';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../shared/store/productState/action.product';
import { selectCurrentPage, selectProducts, selectProductState, selectTotalPages } from '../../../../shared/store/productState/selector.product';
import { MatButton } from '@angular/material/button';
import { catchError, debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormField, MatLabel, MatSelect, MatOption, MatFormFieldModule, MatInputModule, MatButton],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private http = inject(HttpClient);

  displayedColumns: string[] = ['name', "category", 'price', 'stock'];


  category = signal<category[]>([])
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private searchSubject = new Subject<string>();


  dataSource = new MatTableDataSource<Product>([]);
  store = inject(Store)

  products = this.store.selectSignal(selectProducts)
  currentPage = this.store.selectSignal(selectCurrentPage)
  totalPage = this.store.selectSignal(selectTotalPages)

  constructor() {
    effect(() => {
      this.dataSource.data = this.products();
    });

    effect(() => {

      this.store.dispatch(
        ProductActions.loadProducts(this.filters())
      );

    });
  }



  filters = signal({
    page: 1,
    pageSize: 10,
    category: '',
    name: ''
  });


  ngOnInit(): void {
    // this.store.dispatch(ProductActions.loadProducts({ page: 1, pageSize: 10 }))
    this.http.get<category[]>("http://localhost:8000/category").subscribe((res) => {
      console.log(res)
      this.category.set(res)
    })
    
    this.dataSource.data = this.products()
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