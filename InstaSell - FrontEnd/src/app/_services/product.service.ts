import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
// import { Product } from '../cart/Product';
import { Product } from '../_model/product.model';
import { Product1 } from '../all-products/Product1';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private httpClient: HttpClient) { }

  public getAllOrderDetailsForAdmin() : Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9094/order/getAllOrderDetails");
   }

  public getMyOrders(userName) : Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9094/order/getOrderDetails/" + userName);
   }
   public getOrderDetails(orderId) : Observable<MyOrderDetails>{
    return this.httpClient.get<MyOrderDetails>("http://localhost:9094/order/getOrderDetailsById/" + orderId);
   }

  public deleteCartItem(userName, productId){
    return this.httpClient.delete("http://localhost:9092/cart/deleteProductFromCart/"+userName + "/" + productId);
   }

  public addProduct(product: FormData){
    return this.httpClient.post("http://localhost:9091/addNewProduct", product);
  }

  // public addProduct(product: FormData){
  //   return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
  // }

  public getAllProducts(pageNumber, searchKeyword: string= ""){
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getAllProductsFromDB(){
    return this.httpClient.get<Product[]>("http://localhost:9091/product/getAllProducts");
  }

  public getProductDetailsById(productId){
    return this.httpClient.get<Product>("http://localhost:9091/product/getProduct/"+productId);
   }

  public deleteProduct(productId: number){
   return this.httpClient.delete("http://localhost:9091/product/deleteProduct/"+productId);
  }

  public getProductDetails(isSingeProductCheckout,productId){
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingeProductCheckout+"/"+productId);
   }


   public placeOrder(orderDetails: OrderDetails, isCartCheckout, userName){
    return this.httpClient.post("http://localhost:9094/order/placeOrder/"+isCartCheckout + "/" + userName,  orderDetails);
   }

   public addToCart(productId){
    return this.httpClient.get("http://localhost:9090/addToCart/"+productId);
   }

   public getCartDetails(username){
    return this.httpClient.get("http://localhost:9092/cart/getCartDetails/" + username);
   }

   public getProductDetailsForUserCart(productId){
    return this.httpClient.get("http://localhost:9091/product/getProduct/" + productId);
   }

   public cancelOrder(order, orderId){
    return this.httpClient.put("http://localhost:9094/order/updateOrder/" + orderId, order);
   }

   public getProducts(){
    return this.httpClient.get<Product1[]>("http://localhost:9091/product/getAllProducts");
  }

  public addProductToCart(productId, userName){
    return this.httpClient.get("http://localhost:9092/cart/addToCart/" + productId + "/"+ userName);
  }

  public addNewProduct(pObj: any){
    return this.httpClient.post("http://localhost:9091/product/addProduct",pObj);

  }

  public updateProduct(pObj: any, productId: number){
    return this.httpClient.put("http://localhost:9091/product/updateProduct/" + productId , pObj);

  }

  public getProductReviews(productId:number){
    return this.httpClient.get("http://localhost:9095/rating/product/" + productId)
  }

  public addReview(rObj: any, userName: string, productId: number){
    return this.httpClient.post("http://localhost:9095/rating/addRating/" + userName + "/"  + productId, rObj)
  }

}
