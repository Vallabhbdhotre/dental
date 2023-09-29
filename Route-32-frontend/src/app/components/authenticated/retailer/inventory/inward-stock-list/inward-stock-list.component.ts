import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-inward-stock-list',
  templateUrl: './inward-stock-list.component.html',
  styleUrls: ['./inward-stock-list.component.css']
})
export class InwardStockListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  inwardList:Array<any>=[];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Case No', 'Product', 'Quantity', 'Created By', 'Created At'];

  constructor(private inventoryService: InventoryService) {
    this.getInwardStockList()
  }


  getInwardStockList(){
    this.inventoryService.retailerInwardStockPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if(res != null){
          this.inwardList = res.content;
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
    this.getInwardStockList();
  }
}
