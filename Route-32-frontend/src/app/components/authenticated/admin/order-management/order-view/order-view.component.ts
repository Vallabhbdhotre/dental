import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/services/sale/sale.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],
})
export class OrderViewComponent {
  displayedColumns = ['Product Name', 'Quantity', 'Unit Price'];
  orderDetails: Array<any> = [];
  saleObj: any = null;

  constructor(private saleService: SaleService, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null || undefined) {
      this.getSaleById(id);
    }
  }

  getSaleById(id: any) {
    return this.saleService.getSaleById(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.saleObj = res;
          this.orderDetails = res.saleDatas;
        }
      },
      error: (error) => {
        console.log(error);
        let _error = error.error;
        if (error.status == 412) {
          alert(_error.errorMessage);
        }
      }
    })
  }

}
