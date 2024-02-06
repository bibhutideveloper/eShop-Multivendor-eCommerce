import { Component, OnInit } from '@angular/core';
import { cart, logIn, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authErrorMsg: string = '';
  constructor(private user: UserService, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }

  logIn(data: logIn) {
    this.user.userLogIn(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authErrorMsg = 'Invalid email/password !';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogIn() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    console.warn("id::",data  );
    
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("item stired in DB");            
            }
          })
        }, 500);        
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCart')
        }
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);

  }
}
