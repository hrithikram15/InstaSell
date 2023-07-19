import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detais',
  templateUrl: './order-detais.component.html',
  styleUrls: ['./order-detais.component.css']
})
export class OrderDetaisComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'Address', 'Contact No' ,'Amount', 'Status'];
  dataSource = [];
  constructor(private productService : ProductService, private router : Router) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin();
  }

  getAllOrderDetailsForAdmin(){
    this.productService.getAllOrderDetailsForAdmin().subscribe(
      (resp) => {
        console.log(resp);
        this.dataSource = resp;
      }, (error) => {
        console.log(error);
      }
    );
  }

  handleOrderClick(orderId: number) {
    // Perform logic when order ID is clicked

    console.log("Order ID clicked:", orderId);

    this.router.navigate(['/orderInfo'], { queryParams: { orderId: orderId } });

  }
}
