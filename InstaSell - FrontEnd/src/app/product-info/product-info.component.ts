import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { Product1 } from '../all-products/Product1';
import { Rating } from '../_model/rating';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})


export class ProductInfoComponent implements OnInit {

  productId : number = 0;

  userName: String = "";

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

  constructor(private productService : ProductService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
     // Use the orderId in your component logic
     this.userName = localStorage.getItem('name');
     console.log(this.userName);
     console.log('Received ProductId:', this.productId);

     this.getProductDetails(this.productId);

     this.getReviews(this.productId);
   });
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

  addToCart(productId: number){
    console.log(productId);

    this.productService.addProductToCart(productId, this.userName).subscribe(
      (data)=>{
      console.log(data);

      this.router.navigate(['/cart']);


    },
  (error) => {
    console.log(error);
  })

  }

  addReview(productId: number){


    this.router.navigate(['/addRating'], { queryParams: { productId: productId } });


  }

  showAllReviews(productId: number){


    this.router.navigate(['/showRatings'], { queryParams: { productId: productId } });


  }
}
