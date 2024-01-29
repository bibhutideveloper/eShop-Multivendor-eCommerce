import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  productList: undefined | product[]
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.productList().subscribe((result)=>{
      this.productList = result
    })
  }

}
