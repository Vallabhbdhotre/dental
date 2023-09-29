import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-request-admin-list',
  templateUrl: './request-admin-list.component.html',
  styleUrls: ['./request-admin-list.component.css']
})
export class RequestAdminListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  requestList:Array<any>=[];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Product', 'Quantity', 'Status', 'Created By'];

  constructor(private inventoryService: InventoryService) {
    this.getSendRequestList()
  }


  getSendRequestList(){
    this.inventoryService.sendRequestPageable(this.page, this.size).subscribe({
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
    this.getSendRequestList();
  }

}
