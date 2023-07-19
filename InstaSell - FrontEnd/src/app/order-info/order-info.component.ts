import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyOrderDetails } from '../_model/order.model';
import { ProductService } from '../_services/product.service';
import { Product } from '../cart/Product';


@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  orderId: number = 0;

  productDetails: Product = {
    productId: 0,
    brand: "",
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    ratings: 0
  }

  orderDetails: MyOrderDetails = {
    orderId: 0,
    orderFullName: '',
    orderFullOrder: '',
    orderContactNumber: '',
    orderAlternateContactNumber: '',
    orderStatus: '',
    orderAmount: 0,
    productId: 0,
    userName: ''
  };



  constructor( private productService : ProductService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
       this.orderId = params['orderId'];
      // Use the orderId in your component logic
      console.log('Received orderId:', this.orderId);
    });

    this.getOrderDetails(this.orderId);
  
  }

  getOrderDetails(orderId){
    this.productService.getOrderDetails(orderId).subscribe(
      (resp: MyOrderDetails) => {
        console.log(resp);
        this.orderDetails = resp;

        this.getProductDetails(this.orderDetails.productId);

        console.log(this.orderDetails.productId);
      }, (err) => {
        console.log(err);
      }
    )
  }

  getProductDetails(productId){
    this.productService.getProductDetailsForUserCart(productId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.productDetails = resp;

        console.log(this.productDetails.brand);
      }, (err) => {
        console.log(err);
      }
    )
  }

  cancelOrder(orderId: number){
    this.productService.cancelOrder(this.orderDetails, orderId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.productDetails = resp;

        console.log(this.productDetails.brand);
      }, (err) => {
        console.log(err);
      }
    );
    this.router.navigate(['/myOrders']);

  }

  getOrderStatusColor(orderStatus: string): string {
    if (orderStatus === 'Placed') {
      return 'green'; // Set color to green if orderStatus is 'Placed'
    } else if (orderStatus === 'Cancelled') {
      return 'red'; // Set color to red if orderStatus is 'Cancelled'
    } else {
      return ''; // Default color or fallback color
    }
  }
  

}
