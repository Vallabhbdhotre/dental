import { getLocaleMonthNames } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-stock-inward-list',
  templateUrl: './stock-inward-list.component.html',
  styleUrls: ['./stock-inward-list.component.css']
})
export class StockInwardListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  inwardList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Manufacturer', 'Batch', 'Product', 'Quantity', 'Created At'];


  constructor(private inventoryService: InventoryService) {
    this.getStockInwardPageable();
  }

  getStockInwardPageable() {
    this.inventoryService.adminStockInWardPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        this.inwardList = res.content;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getStockInwardPageable();
  }


}
