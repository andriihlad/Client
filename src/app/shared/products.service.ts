import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { CustomerModel } from '../models/customer.model';
import { ApiPaths, environment } from 'src/environments/environment.prod';
import { ProductModel } from '../models/product.model';
import { NgbdModalContent } from './dialogBoxContent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../models/serverModel/product';

@Injectable() 
export class ProductService {
    constructor(private http: HttpClient,  private modalService: NgbModal) {}
  
    getProducts(params: string){
        return this.http.get<ProductModel[]>(environment.baseUrl+ApiPaths.Products + params)
    }
    getProduct(params: string){
        return this.http.get<ProductModel>(environment.baseUrl+ApiPaths.Products + params)
    }
    postProduct(product: Product, params: string ): Observable<ProductModel> {
        return this.http.post<ProductModel>(environment.baseUrl+ApiPaths.Products + params, product)
    }
    putProduct(product: Product){
        return this.http.put<ProductModel>(environment.baseUrl+ApiPaths.Products, product)
    }
    async deleteProduct(id: number){
        const modalRef = this.modalService.open(NgbdModalContent);
        if (await modalRef.result) {
            return this.http.delete<ProductModel>(environment.baseUrl+ApiPaths.Products + "/"+id)
        }
        return new Observable

    }
}