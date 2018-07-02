import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {ToastModule} from 'ng2-toastr/ng2-toastr';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {DataService} from "./data.service";
import { FilterPipe } from './filter.pipe';
import {ProfileService} from "./profile/profile.service";
import {MainService} from "./main.service";
import { ContactComponent } from './contact/contact.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


const appRoutes: Routes = [
  {
    path : '',
    component : HomeComponent,
    resolve: {
      data: DataService
    }
  },
  {
    path : 'profile/:id',
    component : ProfileComponent,
    resolve: {
      data: ProfileService
    }
  },
  {
    path : 'contact/new',
    component : ContactComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    FilterPipe,
    ContactComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService, ProfileService, MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
