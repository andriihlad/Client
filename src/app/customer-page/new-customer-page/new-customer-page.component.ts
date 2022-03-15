import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule , NgModel } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert.service';
import { Customer } from 'src/app/models/serverModel/customer';
import { CustomerService } from 'src/app/shared/customers.service';

@Component({
  selector: 'app-new-customer-page',
  templateUrl: './new-customer-page.component.html',
  styleUrls: ['./new-customer-page.component.css']
})
export class NewCustomerPageComponent implements OnInit {

  datePipeString : string;
  customerForm:FormGroup

  customer: Customer
log(x: string){
  console.log(x)
}

  constructor(private customerService: CustomerService,
     private alertService: AlertService, 
     private datePipe: DatePipe,
     private fb: FormBuilder) { 
   
    this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd') || "";
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group(
      {
       name:'',
       address:''
      }
    )  
    this.customerForm.valueChanges.subscribe()
  
  }
  onSave(customerName: string, customerAddress: string) {
    if (customerName !== "" && customerAddress !== "") {

      this.customer = new Customer(customerName, customerAddress, this.datePipeString)
      this.customerService.postCustomer(this.customer, "").subscribe()
      this.alertService.success("Added new customer with name " + customerName)
    }
    else {
      this.alertService.error("Values cannot be empty")
    }
  }

}
