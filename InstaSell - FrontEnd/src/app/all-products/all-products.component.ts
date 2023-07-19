import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../_services/product.service';
import { Product1 } from './Product1';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  productList: Product1[] = [];
  productId: number = 0;
  flag2:boolean=false;

  userName: String ="anmo";

  constructor(private http:HttpClient, private productService: ProductService, private router : Router ) {
    
   }

  ngOnInit(): void {
    this.getProducts();
    const flag = localStorage.getItem('flag'); 
      if(flag==="true")
      {
        this.flag2=true;
      }
     else{
      this.flag2=false;
     }
     this.userName = localStorage.getItem('name');
     console.log(this.userName);
    }

  getProducts(){
    this.productService.getProducts().subscribe(data => {
      this.productList = data;
      console.log(this.productList)
      console.log(this.productList[0].productId)
    });
  }

  redirectToPage(productId: number){
    console.log(productId+"dnfj");

    this.router.navigate(['/productInfo'], { queryParams: { productId: productId } });


  }
  addToCart(productId:number){
    console.log(productId+"kadnfknk")
    this.productService.addProductToCart(productId, this.userName).subscribe(
      (response) => {
        console.log(response);
      },(error) => {
        console.log(error)
      }
    )
  }

  
  // addToCart(productId){
  //   this.productService.addToCart(productId).subscribe(
  //     (response) => {
  //       console.log(response);
  //     },(error) => {
  //       console.log(error)
  //     }
  //   )

  // addToCart(productId: number){
  //   console.log(productId);

  //   this.productService.addProductToCart(productId, this.userName).subscribe(
  //     (data)=>{
  //     console.log(data);

  //     this.router.navigate(['/cart']);


  //   },
  // (error) => {
  //   console.log(error);
  // })

  // }

}

