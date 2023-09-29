import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-retailer-um-list',
  templateUrl: './retailer-um-list.component.html',
  styleUrls: ['./retailer-um-list.component.css']
})
export class RetailerUmListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  userList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Action', 'Name', 'Email ID', 'Contact No', 'Created At'];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getAllUserPageable();
  }

  getAllUserPageable() {
    this.authService.getAllUserPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.userList = res.content;
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
    this.getAllUserPageable();
  }

  deleteUser(id: any) {
    this.authService.deleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 202){
          alert(res.message);
          this.getAllUserPageable();
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

  userStatusChange(id: any, isActive: any) {
    this.authService.activeInactiveUser(id, isActive).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 202){
          alert(res.message);
          this.getAllUserPageable();
        }
      },
      error: (error) => {
        console.log(error);
        let _error = error.error;
        if (error.status == 412) {
          alert(_error.errorMessage);
          this.getAllUserPageable();
        }
      }
    })
  }

}
