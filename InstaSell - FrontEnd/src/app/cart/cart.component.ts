import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { Product } from './Product';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  

})
export class CartComponent implements OnInit {
  currentUser: any;
  displayedColumns: string[] = ['name', 'description', 'price' , 'discountedPrice' ,'action'];
  cartDetails : any[] = [];
  productDetails : Product[] = [];
  product: Product;


   userName : string="anmo";

  constructor(private productService : ProductService,
    private router : Router,
    private tokenStorageService: TokenStorageService,
    private token: TokenStorageService) {

     }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userName = localStorage.getItem('name');
    console.log(this.userName);
    this.getCartDetails(this.userName);
   
  }



  delete(productId){
    console.log(productId)
    this.productService.deleteCartItem(this.userName, productId).subscribe(
      (resp) => {
        console.log(resp);
        this.getCartDetails(this.userName);

      },(error) =>{
        console.log(error);
      }
    )
  }

  getCartDetails(userName) {
    this.productService.getCartDetails(userName).subscribe(
      (response: any[]) => {
        console.log(response);
        this.cartDetails = response;
        const productIds = this.cartDetails.map(item => item.productId);
        this.getProductDetailsForUserCart(productIds);
        const numOfProducts = response.length;
      localStorage.setItem('numOfProducts', numOfProducts.toString());
      
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  getProductDetailsForUserCart(productIds) {
    this.productDetails = []; // Clear the existing productDetails array
    for (const productId of productIds) {
      this.productService.getProductDetailsForUserCart(productId).subscribe(
        (response: any) => {
          this.productDetails.push(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    console.log(this.productDetails);

  }
  


  

    checkout(productDetails) {
      console.log(productDetails)
      // this.router.navigate(['/buyProduct'], {
      //   queryParams: {  productDetails },
      // });
  
      this.router.navigate(['/buyProduct', { data: JSON.stringify(productDetails) }]);
      

    }
    
    // this.router.navigate(['/buyProduct', {
    //   isSingleProductCheckout: false, id: 0
    // }]);
    // this.productService.getProductDetails(false, 0).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //   },(error) =>{
    //     console.log(error);
    //   }
    // );
  

}
