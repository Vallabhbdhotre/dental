import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-stock-outward-list',
  templateUrl: './stock-outward-list.component.html',
  styleUrls: ['./stock-outward-list.component.css']
})
export class StockOutwardListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  stockOutwardList:Array<any>=[];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Organisation', 'Case No.' ,'Product', 'Quantity', 'Total Units' ,'Created At'];
  
  constructor(private inventoryService: InventoryService, private sanitizer: DomSanitizer) {
    this.getStockOutwardPageable();
  }

  getStockOutwardPageable(){
    this.inventoryService.adminStockOutWardPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if(res.content.length > 0){
          this.stockOutwardList = res.content;
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
    this.getStockOutwardPageable();
  }

  addCase(){
    this.inventoryService.createCase().subscribe({
      next: (res: Blob) => {
        this.downloadFile(res);
      },
      error: (error) => {
        let _error = error.error;
        console.log(_error);
      }
    })
  }

  private downloadFile(data: Blob): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(currentDate.getFullYear()).slice();
    const formattedDate = `${day}-${month}-${year}`;
    a.download = `OutwardStockCase ${formattedDate}.pdf` // Set the desired file name
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
