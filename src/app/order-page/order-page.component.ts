import { Component, OnInit } from '@angular/core';
import { OrderTableHeaders } from 'src/environments/environment.prod';
import { OrderModel } from '../models/order.model';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  OrderTableHeaders :string[]
  Orders: OrderModel[]
  
  constructor(private customerService: OrderService) { }

  ngOnInit(): void {
    this.OrderTableHeaders = OrderTableHeaders
    this.customerService.getCustomers().subscribe(data => this.Orders = data)
   
  }
}

