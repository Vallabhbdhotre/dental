import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-retailer-requests-list',
  templateUrl: './retailer-requests-list.component.html',
  styleUrls: ['./retailer-requests-list.component.css'],
})
export class RetailerRequestsListComponent {
  page: any = 0;
  size: any = 10;
  total: number = 0;
  requestList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Organisation', 'Product', 'Quantity', 'Status'];
  selectedColor!: string; // This variable will hold the selected color
  // Define your enum for status options
  StatusEnum = {
    COMPLETE: 'Complete',
    INCOMPLETE: 'Incomplete',
    PARTIALLY_COMPLETE: 'Partially Complete',
  };

  constructor(private inventoryService: InventoryService) {
    this.getRecievedRequestList();
  }

  getRecievedRequestList() {
    this.inventoryService
      .recievedRequestPageable(this.page, this.size)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res != null) {
            this.requestList = res.content;
            this.total = res.totalElements;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onPageChange(event: PageEvent) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getRecievedRequestList();
  }

  changeStatusOfRequest(id: any, event: any) {
    this.inventoryService
      .changeRequestStatus(id, event.target.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.getRecievedRequestList();
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getClass(rowStatus: string) {
    if (rowStatus === 'COMPLETE') {
      return 'status-green';
    } else if (rowStatus === 'INCOMPLETE') {
      return 'status-red';
    } else if (rowStatus === 'PARTIALLY_COMPLETE') {
      return 'status-yellow';
    } else {
      return '';
    }
  }
}
