import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TemplateService } from 'src/app/services/masterData/template.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  templateList: Array<any> = [];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Code', 'Key', 'Updated At', 'Updated By'];

  constructor(private templateService: TemplateService) { }

  ngOnInit() {
    this.getAllTemplatePageable();
  }

  onPageChange(event: PageEvent) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.getAllTemplatePageable();
  }


  getAllTemplatePageable() {
    this.templateService.getAllTemplatePageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.templateList = res.content;
          this.total = res.totalElements;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
