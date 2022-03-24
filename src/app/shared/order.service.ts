import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiPaths, environment } from 'src/environments/environment.prod';
import { OrderModel } from '../models/order.model';
import { Order } from '../models/serverModel/order';

@Injectable() 
export class OrderService {
    constructor(private http: HttpClient) {}
    getOrder(value: string){
        return this.http.get<OrderModel>(environment.baseUrl+ApiPaths.Orders +value)
    }
    getOrders(){
        return this.http.get<OrderModel[]>(environment.baseUrl+ApiPaths.Orders)
    }
    putOrder( order: OrderModel){
        return this.http.put<Order>(environment.baseUrl+ApiPaths.Orders, order)
    }
    postOrder(order: Order){
        return this.http.post<Order>(environment.baseUrl+ApiPaths.Orders, order)
    }
}