import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    title: 'Seller Auth',
    component: SellerAuthComponent,
  },
  {
    path: 'seller-home',
    title: 'Seller Home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seller-add-product',
    title: 'Add Product',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seller-update-product/:id',
    title: 'Update Product',
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    title: 'Shop',
    component: ShopComponent
  },
  {
    path: 'details/:productId',
    title: 'Product Details',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
