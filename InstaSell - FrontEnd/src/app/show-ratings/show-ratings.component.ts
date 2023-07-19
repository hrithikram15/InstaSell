import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rating } from '../_model/rating';
import { Product1 } from '../all-products/Product1';

@Component({
  selector: 'app-show-ratings',
  templateUrl: './show-ratings.component.html',
  styleUrls: ['./show-ratings.component.css']
})
export class ShowRatingsComponent implements OnInit {

  userName: string = "";
  productId: number = 0;

  ratings : Rating[] = [];

  productDetails : Product1 ={
    productId: 0,
    brand: "",
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    imageURL: "",
    ratings: 0
  };


  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
     // Use the orderId in your component logic
     this.userName = localStorage.getItem('name');
     console.log(this.userName);
     console.log('Received ProductId:', this.productId);

  
   });

   this.getProductDetails(this.productId);


   this.getReviews(this.productId);

  }

  getProductDetails(productId: number){
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


  getReviews(productId: number){
    this.productService.getProductReviews(productId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.ratings = resp;

        console.log(this.ratings[0].userName);
      }, (err) => {
        console.log(err);
      }
    )
  }



}
