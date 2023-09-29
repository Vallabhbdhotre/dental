import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ManufacturerService } from 'src/app/services/masterData/manufacturer.service';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  manufacturerList:Array<any>=[];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Vendor Name', 'Business Name', 'Contact No', 'City', 'Created At'];
  constructor(private manufacturerService: ManufacturerService){}

  ngOnInit(){
    this.getAllManufacturerPageable();
  }

  getAllManufacturerPageable(){
    this.manufacturerService.getAllManufacturerPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.manufacturerList = res.content;
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
    this.getAllManufacturerPageable();
  }


}
