import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/user";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { DashboardService } from "app/services/dashboard.service";
import { ServiceResponce } from "app/service-responce";
import { Batches } from "app/batches";
import { Subject } from 'rxjs/Rx';

import { DataTableParams } from "app/sortbyParams";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})

export class DashboardComponent {
  user: User;
  getData: string;
  batchData: string;
  samplesData: string;
  currentUser: any;
  data: any;
  serviceResponce: ServiceResponce;
  private selectedBatch: string = ''; 
  rows = [];
  samplesArray =[]; 
  samples=  []; 
  batches: Batches[] = [];
  selected = [];
  jsonArray = []; 
  constructor(private _dashboardService: DashboardService) {
    this.currentUser = localStorage.getItem('user');
    this.user = <User>JSON.parse(this.currentUser.toString());
  }

  ngOnInit(): void {

    this._dashboardService.getWorkingBatches(this.user.UserID, this.user.AffiliateCode)
      .subscribe(
      data => {

        this.getData = JSON.stringify(data || null)
        this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
        this.samplesData = this.serviceResponce.Data.toString().toLocaleLowerCase();      
        this.jsonArray = JSON.parse(this.samplesData);
        debugger; 
        if(this.selectedBatch == '')     
        {
          debugger; 
          this.selected = [this.jsonArray[0]];
          this.selectedBatch = this.selected[0].batch.toString();
        }
        this.rows.push(...this.jsonArray);
       // console.log(this.selected);
           
      },
      error => alert(error),
      () => { }
      );
  }

  onSelect({ selected }){
   //// console.log('Selected Event',selected,this.selected); 
    this.selected = selected;     
   //// console.log(this.selected[0]['$$index']);
   //// console.log(selected);
   debugger; 
    this.selectedBatch = selected[0].batch.toString();
    this.loadSamplesForSelectedBatch(selected); 
  }

  loadSamplesForSelectedBatch(batch){   
    this.samplesArray = []; 
    this.batchData  = ""; 
    this.samples = []; 
      this._dashboardService.getSamplesForBatches(this.user.UserID, batch[0].batch)
      .subscribe(
      data => {
        this.getData = JSON.stringify(data || null)
        this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
        this.batchData = this.serviceResponce.Data.toString().toLocaleLowerCase();     
        this.samplesArray = JSON.parse(this.batchData);
        //this.selected = [this.jsonArray[0]];             
        this.samples.push(...this.samplesArray);   
      },
      error => alert(error),
      () => { }
      );
  }
 
  onActivate(event) {
   // console.log('Activate Event', event);
  }

   getSelectedIx() {
     debugger; 
    return this.selected[0]['$$index'];
  }

  updateRowPosition() {
    debugger;
    const ix = this.getSelectedIx();
    const arr = [ ...this.rows ];
    arr[ix - 1] = this.rows[ix];
    arr[ix] = this.rows[ix - 1];
    this.rows = arr;
  }

}
