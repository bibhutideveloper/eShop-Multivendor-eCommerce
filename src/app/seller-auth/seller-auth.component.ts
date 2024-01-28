import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router} from '@angular/router';
import { logIn, signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService, private router:Router) { }
  showLogin = false;
  authErrorMsg:string = '';

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data: signUp): void{
    this.seller.signUp(data)
  }

  logIn(data: logIn): void{
    this.authErrorMsg = '';
    this.seller.logIn(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authErrorMsg='Invalid email or password !'
      }
    })
  }

  openLogin(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }

}
