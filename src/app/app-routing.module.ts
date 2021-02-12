import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent, 
    children: [
      {
        path: 'contacts', 
        component: ContactsComponent
      },
      {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
