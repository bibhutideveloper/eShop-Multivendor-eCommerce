import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  cartItems = 0;
  searchResult: undefined | product[]
  isBottom: boolean | undefined;
  constructor(private router:Router, private product:ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((value: any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller')
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName = sellerData.name
            this.menuType = 'seller'
          }
        }else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user')
            let userData = userStore && JSON.parse(userStore)
            this.menuType = 'user'
            this.userName = userData.name
            this.product.getCartList(userData.id)
        }else{
          this.menuType = 'default'
        }
      }
      
    });
    
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length
    })

  }

  sellerLogOut(){
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }

  userLogOut(){
    localStorage.removeItem('user')
    this.router.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  searchProducts(query: KeyboardEvent) {
    if(query){
      const element = query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((result)=>{
        console.warn(result);
        if(result.length>10){
          result.length = 10 
        }
        this.searchResult = result
      })
    }
  }

  hideSearch() {
    setTimeout(() => {
      this.searchResult = undefined;
    }, 200);
  }

  scrolled: boolean = false
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY >= 30;
  }

}
