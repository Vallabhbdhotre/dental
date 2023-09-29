import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-recieved-request-list',
  templateUrl: './recieved-request-list.component.html',
  styleUrls: ['./recieved-request-list.component.css']
})
export class RecievedRequestListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  requestList:Array<any>=[];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Organisation', 'Product', 'Quantity', 'Status', 'Created By'];

  constructor(private inventoryService: InventoryService) {
    this.getRecievedRequestList()
  }


  getRecievedRequestList(){
    this.inventoryService.recievedRequestPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if(res != null){
          this.requestList = res.content;
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
    this.getRecievedRequestList();
  }





}
