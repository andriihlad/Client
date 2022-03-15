import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { CustomerModel } from '../models/customer.model';
import { ApiPaths, environment } from 'src/environments/environment.prod';
import { ProductModel } from '../models/product.model';
import { OrderModel } from '../models/order.model';

@Injectable() 
export class OrderService {
    constructor(private http: HttpClient) {}
  
    getCustomers(){
        return this.http.get<OrderModel[]>(environment.baseUrl+ApiPaths.Orders)
    }
}