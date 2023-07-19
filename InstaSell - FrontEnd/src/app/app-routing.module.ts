import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AdminComponent } from './admin/admin.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { CartComponent } from './cart/cart.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderDetaisComponent } from './order-detais/order-detais.component';
import { ProductResolveService } from './product-resolve.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { RegisterComponent } from './register/register.component';
import { ShowProductDetailesComponent } from './show-product-detailes/show-product-detailes.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { OrderInfoComponent } from './order-info/order-info.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductsAdminComponent } from './show-products-admin/show-products-admin.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { ShowRatingsComponent } from './show-ratings/show-ratings.component';

const routes: Routes = [
  // { path: '', component: HeaderComponent }, 
  { path: '', component: AllProductsComponent }, //both
  { path: 'buyProduct', component: BuyProductComponent }, //checkout/place order - user
  { path: 'login', component: LoginComponent }, 
  { path: 'addRating', component: AddRatingComponent }, 
  { path: 'showRatings', component: ShowRatingsComponent }, 


  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart' , component: CartComponent }, //cart - user
  { path: 'orderConfirm', component: OrderConfirmationComponent }, // user
  { path: 'myOrders', component: MyOrdersComponent  }, //user 
  { path: 'register', component: RegisterComponent }, //user
  {path: 'orderInfo', component: OrderInfoComponent}, //both
  {path: 'allProducts', component: AllProductsComponent}, //both
  {path: 'productInfo', component: ProductInfoComponent}, //both
  {path: 'addProduct', component: AddProductComponent}, //add product - admin
  {path: 'updateProduct', component: UpdateProductComponent}, //update product -admin
  { path: 'orderInformation' , component: OrderDetaisComponent}, //from all orders from all users - admin
  {path: 'adminProductDetails', component: ShowProductsAdminComponent}  //all product details for admin - admin
  // { path: 'addNewProduct', component: AddNewProductComponent },
  // { path: '', component: HomeComponent },
  // { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  // { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },


 
  // { path: 'addNewProduct', component: AddNewProductComponent , canActivate:[AuthGuard], data:{roles:['Admin']},
  //    resolve: {
  //           product: ProductResolveService
  //         }},
  // { path: 'showProductDetailes' , component: ShowProductDetailesComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']}},
  // { path: 'productViewDetails', component: ProductViewDetailsComponent, resolve: { product: ProductResolveService }},
  // // { path: 'buyProduct' , component: BuyProductComponent,
  // resolve: {
  //        productDetails: BuyProductResolverService} },
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
