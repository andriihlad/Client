import { Component, OnInit } from '@angular/core';
import { ProductTableHeaders } from 'src/environments/environment.prod';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../shared/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  ProductTableHeaders :string[]
  Products: ProductModel[]
  
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.ProductTableHeaders = ProductTableHeaders
    this.productService.getProducts("").subscribe(data =>{ this.Products = data
    })
    
  }
  async onDelete(id: number){
    (await this.productService.deleteProduct(id)).subscribe(data => {
      var index = this.Products.findIndex(x=> x.id == (data as ProductModel).id)
      this.Products.splice(index,1)
    })
  }
}
