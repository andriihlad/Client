import { Component, OnInit } from '@angular/core';
import { CustomerTableHeaders, environment } from 'src/environments/environment.prod';
import { FormBuilder, FormGroup,  ReactiveFormsModule , NgModel } from '@angular/forms';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../shared/customers.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent implements OnInit {
  CustomerTableHeaders :string[]
  Customers: CustomerModel[]
  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {
    this.CustomerTableHeaders = CustomerTableHeaders
    this.customerService.getCustomers("").subscribe(data => this.Customers = data)
  }
  async onDelete(id: number){
    (await this.customerService.deleteCustomer(id)).subscribe(data => {
      var index = this.Customers.findIndex(x=> x.id == (data as CustomerModel).id)
      this.Customers.splice(index,1)
    })

    
  }

}
