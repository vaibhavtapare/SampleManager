import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routes } from "app/app.routes";
import { RouterModule } from "@angular/router";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SamplesComponent } from './dashboard/samples/samples.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SamplesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    NgxDatatableModule,
    ReactiveFormsModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
