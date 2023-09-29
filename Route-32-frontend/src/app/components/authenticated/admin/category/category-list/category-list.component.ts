import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CategoryService } from 'src/app/services/masterData/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  page: any = 0;
  size: any = 10;
  total: number = 0;
  categoryList:Array<any>=[];
  @Output() pageChange: EventEmitter<number> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['Action' ,'Name', 'Description', 'Updated At', 'Updated By'];

  constructor(private categoryService: CategoryService){}

  ngOnInit(){
    this.getAllCategoryPageable()
  }

  getAllCategoryPageable(){
    this.categoryService.getAllCategoryPageable(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        if(res != null){
          this.categoryList = res.content;
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
    this.getAllCategoryPageable();
  }

  deleteCategory(id: any){
    this.categoryService.deleteCategory(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 200){
          alert(res.message);
          this.getAllCategoryPageable();
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

  changeStatusCategory(id: any, data: any){
    this.categoryService.changeStatusCategory(id, data).subscribe({
      next: (res) => {
        console.log(res);
        if(res.code == 202){
          alert(res.message);
          this.getAllCategoryPageable();
        }
      },
      error: (error) => {
        console.log(error);
        let _error = error.error;
        if (error.status == 412) {
          alert(_error.errorMessage);
          this.getAllCategoryPageable();
        }
      }
    })
  }
}
