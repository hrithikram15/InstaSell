import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/order.model';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns = ["OrderId", "Name", "Address" , "Contact No" , "Amount" , "Status"];

  myOrderDetails: MyOrderDetails[] =[];

  userName : string = "anmol";
  constructor(private productService : ProductService, private router : Router) {
   
   }

  ngOnInit(): void {
    this.userName = localStorage.getItem('name');
    console.log(this.userName);
    this.getOrderDetails(this.userName);
  }

  getOrderDetails(userName){
    this.productService.getMyOrders(userName).subscribe(
      (resp: MyOrderDetails[]) => {
        console.log(resp);
        this.myOrderDetails = resp;
      }, (err) => {
        console.log(err);
      }
    )
  }

  handleOrderClick(orderId: number) {
    // Perform logic when order ID is clicked

    console.log("Order ID clicked:", orderId);

    this.router.navigate(['/orderInfo'], { queryParams: { orderId: orderId } });

  }

}
