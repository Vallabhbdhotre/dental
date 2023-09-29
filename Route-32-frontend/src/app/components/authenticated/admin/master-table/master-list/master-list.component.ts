import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IntegrationSettingService } from 'src/app/services/masterData/integration-setting.service';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  userList:Array<any>=[];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Type', 'Updated At', 'Action'];
  masterTableList: Array<any> = [];

  constructor(private settingService: IntegrationSettingService){
    this.getAllPlatformParam();
  }

  getAllPlatformParam(){
    this.settingService.getAllPlatformParams(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if(res.content.length > 0){
          this.masterTableList = res.content;
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
  }

}
