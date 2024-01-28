import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product
  updateProductMsg: undefined | string
  constructor(private route:ActivatedRoute, private product:ProductService, private router: Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    productId && this.product.getProduct(productId).subscribe((data)=>{
      this.productData = data
    })
  }

  updateProduct(data: product) {
    // you can use hidden textbox in form to deal with product id
    // also you can set product id manually in 'data' like below 'if statement'
    if(this.productData){
      data.id = this.productData.id
    }

    this.product.updateProduct(data).subscribe(()=>{
      this.updateProductMsg = 'Product updated successfully'
    })
    setTimeout(()=>{
      this.updateProductMsg = undefined,
      this.router.navigate(['/seller-home'])
    },
    3000)
  }

}
