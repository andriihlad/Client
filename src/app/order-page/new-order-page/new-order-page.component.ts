import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/alert/alert.service';
import { CategoryModel } from 'src/app/models/category.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import { Order } from 'src/app/models/serverModel/order';
import { SizeModel } from 'src/app/models/size.model';
import { StatusModel } from 'src/app/models/status.model';
import { CustomerService } from 'src/app/shared/customers.service';
import { NgbdModalContent } from 'src/app/shared/dialogBoxContent';
import { OrderService } from 'src/app/shared/order.service';
import { ProductService } from 'src/app/shared/products.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ProductInOrderTableHeaders } from 'src/environments/environment.prod';

@Component({
  selector: 'app-new-order-page',
  templateUrl: './new-order-page.component.html',
  styleUrls: ['./new-order-page.component.scss']
})
export class NewOrderPageComponent implements OnInit {
  productTableHeaders: string[]
  totalCost: number = 0
  order: OrderModel
  pageId: string

  datePipeString: Date= new Date()
  customers: CustomerModel[]
  products: ProductModel[]
  sizes: SizeModel[]
  categories: CategoryModel[]
  statuses: StatusModel[]

  selectedProducts: ProductModel[] =[]
  selectedProduct: ProductModel
  selectedCustomer: CustomerModel
  selectedStatus: StatusModel

  @ViewChild('qty') qty: ElementRef

  constructor(private customerService: CustomerService, 
    private productService: ProductService, 
    private sharedService: SharedService,
    private alertService: AlertService,
    private orderService: OrderService, 
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pageId = this.route.snapshot.params['id']
    if (this.pageId != "new")
      {
      this.orderService.getOrder("/"+this.pageId).subscribe(data =>{ this.order = data
        this.selectedProducts = this.order.products
        this.selectedStatus = this.order.status
        this.selectedCustomer = this.order.customer

      })
    }
    this.loadData()
  }
  loadData(){
    this.productTableHeaders = ProductInOrderTableHeaders
    this.customerService.getCustomers('').subscribe(data => this.customers= data)
    this.productService.getProducts('').subscribe(data=> this.products = data)
    this.sharedService.getCategories('').subscribe(data => this.categories=data)
    this.sharedService.getSizes('').subscribe(data => this.sizes=data)
    this.sharedService.getStatuses('').subscribe(data=> this.statuses=data)
  }
  

  onAddProduct(){   
    let quantity: number = +  Math.round(this.qty.nativeElement.value || 0)
    const foundId = this.selectedProducts.findIndex(obj => obj.id==this.selectedProduct.id)
    const found = foundId == -1 ? undefined : this.selectedProducts[foundId]
    if (this.selectedProduct === undefined) {
      this.alertService.error('No product selected!');
    }
    else if(quantity == 0){
      this.alertService.error('Quantity must be bigger than 0');
    }
    else if(this.selectedProduct.quantity < quantity + (found == undefined? 0 : found?.quantity))
    {
      this.alertService.error('Your selected quantity exceeds current product quantity');
    }
    else {
      if(foundId != -1 && found !== undefined){
        this.selectedProducts[foundId] =  new ProductModel(
          this.selectedProduct.id, 
          this.selectedProduct.name, 
          found?.quantity + quantity,
          found?.price + this.selectedProduct.price * quantity, 
          this.selectedProduct.description, 
          this.selectedProduct.creationDate,
          this.selectedProduct.category, 
          this.selectedProduct.size)
      }
      else{
      this.selectedProducts.push(
        new ProductModel(this.selectedProduct.id, 
          this.selectedProduct.name, 
          quantity,
          this.selectedProduct.price * quantity, 
          this.selectedProduct.description, 
          this.selectedProduct.creationDate,
          this.selectedProduct.category, 
          this.selectedProduct.size 
          ))
      }
      this.updateTotalCost( this.selectedProduct.price * quantity)
      
    }
  }
 async onDeleteProduct(id: number){
  const modalRef = this.modalService.open(NgbdModalContent);
  if (await modalRef.result) {

    var index = this.selectedProducts.findIndex(x=> x.id == id)
    this.selectedProducts.splice(index,1)
    
  }
  }
  updateTotalCost(value: number){
    this.totalCost += value
  }
  onSave(qty: string, description: string){
    const order = new Order(this.selectedCustomer,this.selectedStatus, this.totalCost, this.datePipe.transform(this.datePipeString, "MM/dd/YY")  || "" , this.selectedProducts, description)
    if(this.pageId == "new"){
      console.log(1)
       this.orderService.postOrder(order).subscribe(
        (data) => {this.alertService.success("Added new order!")}
       )
    }
    else{
      this.orderService.putOrder(new OrderModel(this.order.id, order.customer, order.status, order.totalCost, order.date, order.products, order.description, this.order.archived)).subscribe(
        (data) => {this.alertService.success("Order edited!")},
        (error) => {this.alertService.error("Something went wrong!")}
      )
    }
  }
}
// public customer: CustomerModel,
// public status: StatusModel,
// public totalCost: number,
// public date: string,
// public products: ProductModel[],
// public description: string