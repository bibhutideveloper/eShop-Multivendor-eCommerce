import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { orders } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price * +item.quantity);
        }
      });
      this.totalPrice = price+(price/12)+50-(price/10);
      console.warn(this.totalPrice);
      
    });
  }

  orderNow(data: orders){
  let user = localStorage.getItem('user')
  let userId = user && JSON.parse(user).id
  
  if(this.totalPrice){
    let orderData: orders = {
      ...data,
      totalPrice: this.totalPrice,
      userId
    }
  this.product.orderNow(orderData).subscribe((result)=>{
    if(result){
      alert('Order Placed Success')
    }
  })
  }
  }

}
