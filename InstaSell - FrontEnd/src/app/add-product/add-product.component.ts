import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  
  addProduct(registerForm: NgForm){

    registerForm.value.productId = 7;


    console.log(registerForm.value)
    this.productService.addNewProduct(registerForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/allProducts']);
      },
      (error) => {
        console.log(error);
      }
      );  

  }

}
