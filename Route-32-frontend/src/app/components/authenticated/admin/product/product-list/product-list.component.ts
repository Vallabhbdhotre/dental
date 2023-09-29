import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductService } from 'src/app/services/masterData/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  productList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Action' ,'Name', 'Category', 'Sale Price', 'Discount', 'Weight'];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProductsPageable();
  }

  getAllProductsPageable() {
    this.productService.getAllProductsPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.productList = res.content;
          this.total = res.totalElements;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getAllProductsPageable();
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.code == 200) {
          alert(res.message);
          this.getAllProductsPageable();
        }
      },
      error: (error) => {
        console.log(error);
        let _error = error.error;
        if (error.status == 412) {
          alert(_error.errorMessage)
        }
      }
    })
  }

  changeStatusProduct(id: any, data: any) {
    this.productService.changeStatusProduct(id, data).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 202){
          alert(res.message);
          this.getAllProductsPageable();
        }
      },
      error: (error) => {
        console.log(error);
        let _error = error.error;
        if (error.status == 412) {
          alert(_error.errorMessage);
          this.getAllProductsPageable();
        }
      }
    })
  }
}
