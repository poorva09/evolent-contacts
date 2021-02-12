import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacts } from '../modals/contact.modal';
import { ContactsService } from '../services/contacts.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public editIndex;
  public contactsForm : FormGroup;
  public contacts: Contacts[] = [];
  public addMode: boolean = false;
  public editMode: boolean = false;
  public btn: string = '';
    constructor(private fb: FormBuilder, private contactsService: ContactsService) {
      this.contactsForm = this.fb.group({
        'firstName': '',
        'lastName': '',
        'email': '',
        'phoneNumber': '',
        'status': '',
      });
   }

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe(res => {
      this.contacts = res;
    });
  }

  addContact(form: FormGroup, index: number){
    let contacts = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phoneNumber: form.value.phoneNumber,
      status: form.value.status
    };
    if(this.addMode){
      contacts.status = 'Active';
      this.contactsService.addContact(contacts);
      this.addMode = false;
    }
    if(this.editMode){
      this.contactsService.editContact(contacts, index);
      this.editMode = false;
    }
    this.contactsForm.reset();
    this.editIndex = null;
  }

  editContact(index: number){
    this.editMode = true;
    this.editIndex = index;
    this.btn = 'Edit Contact';
    this.contactsForm.setValue(this.contacts[index]);
  }

  delectContact(index: number){
    console.log(index);
      this.contactsService.deleteContact(index);
  }

  changeStatus(index: number, status: string){
    this.contactsService.changeStatus(index, status);
  }
}
