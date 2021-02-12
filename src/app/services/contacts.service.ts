import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contacts } from '../modals/contact.modal';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contacts: Contacts[] = [];
  public contactsObservable = new BehaviorSubject<Contacts[]>(this.contacts);
  public contactsObs = this.contactsObservable.asObservable();

  constructor() { }

  addContact(contact: Contacts){
    this.contacts.push(contact);
    this.contactsObservable.next(this.contacts);
  }

  getContacts(){
    return this.contactsObs;
  }

  deleteContact(index: number){
    this.contacts.splice(index, 1);
    this.contactsObservable.next(this.contacts);
  }

  editContact(contact: Contacts, index: number){
    this.contacts[index] = contact;
    this.contactsObservable.next(this.contacts);
  }

  changeStatus(index: number, status: string){
    if(status == 'Active'){
      this.contacts[index].status = 'Inactive';

    }
    if(status == 'Inactive'){
      this.contacts[index].status = 'Active';
    }
    this.contactsObservable.next(this.contacts);
  }
}
