import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((value: any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          console.warn("inside seller area")
          this.menuType = 'seller'
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller')
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName = sellerData.name
          }
        }else{
          console.warn("outside seller")
          this.menuType = 'default'
        }
      }
    });
  }

  logOut(){
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }

}
