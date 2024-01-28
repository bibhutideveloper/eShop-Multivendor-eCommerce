import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMsg: undefined | string;
  deleteIcon = faTrash;
  updateIcon = faEdit;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    });
  }

  deleteProduct(id: string) {
    console.warn('p id::', id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMsg = 'Product deleted';
        this.ngOnInit()
      }
    });

    setTimeout(() => { this.productMsg = undefined}, 3000);
  }
}
