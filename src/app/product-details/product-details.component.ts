import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product
  similarProducts: undefined | product[]
  productQuantity: number = 1
  constructor(private route:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId')
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productData = result
    })
  }

  handleQuantity(operation: string){
    if(this.productQuantity<=10 && operation==='+'){
      this.productQuantity += 1
    }
    else if(this.productQuantity>1 && operation==='-'){
      this.productQuantity -= 1
    }
  }

}
