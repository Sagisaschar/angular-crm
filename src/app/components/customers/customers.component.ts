import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import * as _ from 'lodash';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  headerTitle: string;
  headerIcon: string;
  customers: Customer[];
  customersCache: Customer[];
  firstName: string;
  lastName: string;
  phone: string;

  constructor(
    private cs: CustomersService,
    private fms: FlashMessagesService
  ) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Customers';
    this.headerTitle = 'Customers';
    this.headerIcon = 'fas fa-user';
    this.cs.getCustomers().subscribe( customers => this.customers = this.customersCache = customers );
  }

  showOnHover(event){
    event.target.children[0].children[0].style.cssText = 'visibility: visible !important';
  }

  hideOnLeave(event){
    event.target.children[0].children[0].style.cssText = 'visibility: hidden !important';
  }

  onDeleteCustomer(customerId, event){
    
    event.preventDefault();
    if(confirm('Are you sure?')) {

      this.fms.show('Customer deleted!', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      });
      this.cs.deleteCustomer(customerId);

    }

  }

  onSearch(field){

    let searchField = this[field].toLowerCase().trim();
    if(searchField.length > 0){

      this.customers = this.customersCache.filter(data => _.includes(data[field].toLowerCase().trim(), searchField));

    } else {

      this.customers = this.customersCache;

    }

  }

}
