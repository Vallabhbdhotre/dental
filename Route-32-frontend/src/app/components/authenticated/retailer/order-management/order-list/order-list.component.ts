import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SaleService } from 'src/app/services/sale/sale.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

  displayedColumns = [
    'Order Id',
    'Consumer Name',
    'Order Amount',
    'Mode of payment',
    'Date & Time',
  ];

  page: any = 0;
  size: any = 10;
  total: number = 0;
  orderList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor(private saleService: SaleService) {
    this.getSalesPageable();
  }

  getSalesPageable() {
    this.saleService.getSalesPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.orderList = res.content;
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
    this.getSalesPageable();
  }
}
