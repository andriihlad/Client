import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { Product } from 'src/app/models/serverModel/product';
import { SizeModel } from 'src/app/models/size.model';
import { ProductService } from 'src/app/shared/products.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent implements OnInit {
  product: ProductModel
  categories :CategoryModel[]
  sizes: SizeModel[]
  selectedSize: SizeModel
  selectedCategory: CategoryModel
  creationStatus: string
  datePipeString: Date= new Date()
  id: string

  constructor(
    private sharedService: SharedService, 
    private route: ActivatedRoute, 
    private datePipe: DatePipe,
    private productService: ProductService,
    private alertService: AlertService) { 

  }

  ngOnInit(): void {
    console.log(Date())
    this.id = this.route.snapshot.params['id']
    if (this.id == "new") {
      this.creationStatus = "new"
    }
    else {
      this.productService.getProduct("/"+this.id).subscribe(data =>{ this.product = data
        this.selectedCategory = this.product.category
        this.selectedSize = this.product.size 
      })

    }
    this.sharedService.getCategories("").subscribe(data => {this.categories = data})
    this.sharedService.getSizes("").subscribe(data => {this.sizes = data})
  }
  onSave(productName: string, quantity: string, price: string, description: string){
    console.log("On Save action")
    try{
      if(this.id == "new"){
        
      console.log("new product")
      let product : Product = new Product(productName, +quantity, +price, description,this.datePipe.transform(this.datePipeString, "MM/dd/YY")  || ""  ,  this.selectedCategory,  this.selectedSize)
      console.log(this.datePipeString)
      this.productService.postProduct(product, "").subscribe()
      this.alertService.success("New product successfully added ")
    }
    else{
      console.log("Edited product with id:")
      console.log(+this.id)
      let product : ProductModel = new ProductModel(+this.id, productName, +quantity, +price, description,this.product.creationDate,  this.selectedCategory,  this.selectedSize)
      this.productService.putProduct(product).subscribe(data => console.log(data))
    }
    }
    catch{
      this.alertService.error("Something went wrong")
    }
  }

}

// productName.value, qty.value, price.value, description.value

