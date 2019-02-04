import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Array<Contact>;
  contactsCache: Array<Contact>;
  contactsLength: number;
  searchNameText: string;
  headerTitle: string;
  headerIcon: string;

  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit() {

    document.title = 'COMPANY CRM | Contacts';
    this.contactsService.getContacts().subscribe((contacts: Array<Contact>) => {
      this.contactsCache = this.contacts = _.sortBy(contacts, ['name']);
      this.contactsLength = this.contacts.length;
    });
    this.headerTitle = 'Contacts';
    this.headerIcon = 'fas fa-envelope';

  }

  onKeyupSearch(){

    const searchText = this.searchNameText.toLowerCase().trim();
    if ( searchText.length > 0 ){

      this.contacts = this.contactsCache.filter( (contact) => _.includes(contact.name.toLowerCase(), searchText) );

    } else {

      this.contacts = this.contactsCache;

    }

  }

}
