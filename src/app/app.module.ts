import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { CustomerService } from './shared/customers.service';
import { OrderPageComponent } from './order-page/order-page.component';
import { ProductService } from './shared/products.service';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { OrderService } from './shared/order.service';
import { NewCustomerPageComponent } from './customer-page/new-customer-page/new-customer-page.component';
import { NewProductPageComponent } from './product-page/new-product-page/new-product-page.component';
import { ViewProductComponent } from './product-page/view-product/view-product.component';
import { DatePipe } from '@angular/common'; 
import { SharedService } from './shared/shared.service';
import { NewOrderPageComponent } from './order-page/new-order-page/new-order-page.component';
import { ViewOrderComponent } from './order-page/view-order/view-order.component';

const appRoutes: Routes = [
  { path: 'orders', component: OrderPageComponent },
  { path: 'orders/new-order/:id', component: NewOrderPageComponent},
  { path: 'orders/view-order/:id', component: ViewOrderComponent},
  { path: 'products', component: ProductPageComponent},
  { path: 'products/new-product/:id', component: NewProductPageComponent},
  { path: 'products/view-product/:id', component: ViewProductComponent},
  { path: 'customers/new-customer', component: NewCustomerPageComponent},
  { path: 'customers', component: CustomerPageComponent},
  { path: '**', redirectTo: 'orders' }
]


@NgModule({
  declarations: [
    AppComponent,
    OrderPageComponent,
    AlertComponent,
    CustomerPageComponent,
    ProductPageComponent,
    NewProductPageComponent,
    ViewProductComponent,
    NewOrderPageComponent,
    ViewOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [CustomerService, ProductService, OrderService, DatePipe,  SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
