import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {

  userName: string = "";
  productId: number = 0;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
     // Use the orderId in your component logic
     this.userName = localStorage.getItem('name');
     console.log(this.userName);
     console.log('Received ProductId:', this.productId);

  
   });
  }

  addReview(registerForm: NgForm){

    registerForm.value.ratingId = 7;


    console.log(registerForm.value)
    this.productService.addReview(registerForm.value, this.userName, this.productId).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/showRatings'], { queryParams: { productId: this.productId } });
      },
      (error) => {
        console.log(error);
      }
      );  

  }

}
