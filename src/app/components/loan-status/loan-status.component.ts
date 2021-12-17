import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const BASEURL = environment.BASEURL;

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.css']
})

@Injectable()

export class LoanStatusComponent implements OnInit {
  message: any;
  accuracy: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }


  clickEvent(){
    this.message = "the model is training...";
    this.http.get(BASEURL+"training").subscribe(response =>{
      console.log(response);
      if(response != null)
      {
       this.accuracy  = JSON.parse(JSON.stringify(response)).Accuracy;
       this.message = `model has an accuracy of ${this.accuracy} `;
      }
    })
  }

}
