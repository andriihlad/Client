import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from 'src/app/models/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { ProductInOrderTableHeaders } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  order: OrderModel
  productTableHeaders:string[]
  p: number[]

  constructor(private route: ActivatedRoute,private orderService: OrderService) { }

  ngOnInit(): void {
 
    this.productTableHeaders = ProductInOrderTableHeaders
    this.productTableHeaders.splice(-1)
    this.orderService.getOrder("/"+this.route.snapshot.params['id']).subscribe(data=>{ this.order=data
      
    })
   
  }

}
