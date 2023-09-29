import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-business-inventory',
  templateUrl: './business-inventory.component.html',
  styleUrls: ['./business-inventory.component.css']
})
export class BusinessInventoryComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  inventoryList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Sr No', 'Product', 'Quantity'];
  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getAllBusinessInventoryPageable()
  }

  getAllBusinessInventoryPageable() {
    this.inventoryService.getAllAdminStockPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.inventoryList = res.content;
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
    this.getAllBusinessInventoryPageable();
  }

}