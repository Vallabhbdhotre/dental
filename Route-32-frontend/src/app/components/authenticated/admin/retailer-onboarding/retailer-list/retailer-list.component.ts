import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RetailerOnboardingService } from 'src/app/services/onboarding/retailer-onboarding.service';

@Component({
  selector: 'app-retailer-list',
  templateUrl: './retailer-list.component.html',
  styleUrls: ['./retailer-list.component.css'],
})
export class RetailerListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  retailerList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Action', 'First Name', 'Last Name', 'Mobile No.', 'Email ID', 'Business Name']

  constructor(private retailerService: RetailerOnboardingService) { }

  ngOnInit(){
    this.getAllRetailerPageable();
  }

  getAllRetailerPageable() {
    this.retailerService.getAllRetailerPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.retailerList = res.content;
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
    this.getAllRetailerPageable();
  }

  deleteRetailerById(id: any){
    this.retailerService.deleteRetailerById(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 201){
          alert(res.message);
          this.getAllRetailerPageable();
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

  retailerStatusChange(id: any, data: any){
    this.retailerService.retailerStatusChange(id, data).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 202){
          alert(res.message);
          this.getAllRetailerPageable();
        }
      },
      error: (error) => {
        console.log(error);
        let _error = error.error;
        if (error.status == 412) {
          alert(_error.errorMessage);
          this.getAllRetailerPageable();
        }
      }
    })
  }

}
