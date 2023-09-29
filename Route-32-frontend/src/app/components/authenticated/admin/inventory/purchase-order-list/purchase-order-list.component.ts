import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PurchaseOrderService } from 'src/app/services/inventory/purchase-order.service';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent {
  
  page: any = 0;
  size: any = 10;
  total: number = 0;
  purchaseList:Array<any>=[];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Manufacturer', 'P.O. Code', 'Delivery Date', 'Created On'];

  constructor(private purchaseService: PurchaseOrderService) {}

  ngOnInit(){
    this.getAllPurchaseOrderPageable()
  }

  getAllPurchaseOrderPageable(){
    this.purchaseService.getAllPurchaseOrderPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if(res != null){
          this.purchaseList = res.content;
          this.total = res.totalElements;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onPageChange(event:PageEvent){
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getAllPurchaseOrderPageable();
  }


}
