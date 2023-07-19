import { Component, OnInit } from '@angular/core';
import { Product1 } from '../all-products/Product1';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-products-admin',
  templateUrl: './show-products-admin.component.html',
  styleUrls: ['./show-products-admin.component.css']
})
export class ShowProductsAdminComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Brand', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price' ,'Actions'];
  productDetails : Product1[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();

  }
  getAllProducts(){
    this.productService.getProducts().subscribe(data => {
      this.productDetails = data;
      console.log(this.productDetails)
      console.log(this.productDetails[0].productId)
    });
  }

  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe(
      (resp)=> {
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);}
    );    
  }

  editProductDetails(productId){
    this.router.navigate(['/updateProduct'], { queryParams: { productId: productId } })
  }

}
