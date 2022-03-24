import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { CustomerModel } from '../models/customer.model';
import { ApiPaths, environment } from 'src/environments/environment.prod';
import { Customer } from '../models/serverModel/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './dialogBoxContent';

@Injectable({providedIn: 'root'}) 
export class CustomerService {
    constructor(private http: HttpClient, private modalService: NgbModal) {
        
    }
  
    getCustomers(params: string): Observable<CustomerModel[]>{
    
        return this.http.get<CustomerModel[]>(environment.baseUrl+ApiPaths.Customers + params)
    }
    postCustomer(customer: Customer, params: string ): Observable<CustomerModel> {
        return this.http.post<CustomerModel>(environment.baseUrl+ApiPaths.Customers + params, customer)
    }
    async deleteCustomer(id: number): Promise<Observable<CustomerModel>>{
        const modalRef = this.modalService.open(NgbdModalContent);
        if (await modalRef.result) {
            return this.http.delete<CustomerModel>(environment.baseUrl+ApiPaths.Customers + "/"+id)
        }
        return new Observable

    }
}
