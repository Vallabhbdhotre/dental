import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserRoleService } from 'src/app/services/auth/user-role.service';

@Component({
  selector: 'app-retailer-role-list',
  templateUrl: './retailer-role-list.component.html',
  styleUrls: ['./retailer-role-list.component.css']
})
export class RetailerRoleListComponent {
  
  page: any = 0;
  size: any = 10;
  total: number = 0;
  roleList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Action', 'Name','Created By', 'Created Date'];

  constructor(private userRoleService: UserRoleService) { }

  ngOnInit(){
    this.getAllRolePageable();
  }

  getAllRolePageable(){
    this.userRoleService.getAllRolesPagination(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if(res.content != null){
          this.roleList = res.content;
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
    this.getAllRolePageable();
  }

  deleteRoleById(id: any){
    this.userRoleService.deleteRoleById(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 202){
          alert(res.message);
          this.getAllRolePageable();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  disableRole(id: any, data: any){
    this.userRoleService.enableDisableRole(id, data).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 202){
          alert(res.message);
          this.getAllRolePageable();
        }
      },
      error: (error) => {
        console.log(error);
        let _error = error.error;
        if (error.status == 412) {
          alert(_error.errorMessage);
          this.getAllRolePageable();
        }
      }
    })
  }


}
