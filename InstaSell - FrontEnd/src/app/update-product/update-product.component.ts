import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product1 } from '../all-products/Product1';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productId: number = 0;

  productDetails: Product1 = {
    productId: 0,
    brand: "",
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    ratings: 0,
    imageURL: ""
  }


  constructor(private productService: ProductService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
     // Use the orderId in your component logic
     console.log('Received productId:', this.productId);
   });

   this.getProductDetails(this.productId);
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

  updateProduct(registerForm: NgForm){

    // registerForm.value.productId = 7;


    console.log(registerForm.value)
    this.productService.updateProduct(registerForm.value, this.productId).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/adminProductDetails']);
      },
      (error) => {
        console.log(error);
      }
      );  

  }

}
