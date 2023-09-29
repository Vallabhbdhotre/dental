import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UomService } from 'src/app/services/masterData/uom.service';

@Component({
  selector: 'app-uom-list',
  templateUrl: './uom-list.component.html',
  styleUrls: ['./uom-list.component.css']
})
export class UomListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  uomList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Code', 'Name', 'Updated At', 'Updated By'];

  constructor(private uomService: UomService) { }

  ngOnInit() {
    this.getAllUomPageable();
  }

  onPageChange(event: PageEvent) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getAllUomPageable();
  }

  getAllUomPageable(){
    this.uomService.getAllUomPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.uomList = res.content;
          this.total = res.totalElements;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteUom(id: any){
    this.uomService.deleteUom(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 200){
          alert(res.message);
          this.getAllUomPageable();
        }
      },
      error: (error) => {
        console.log(error);
        let _error = error.error;
        if(error.status == 412){
          alert(_error.errorMessage)
        }
      }
    })
  }

}
