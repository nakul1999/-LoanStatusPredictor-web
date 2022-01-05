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

export class LoanStatusComponent{
  message: any;
  accuracy: any;
  preprocessMessage: string | undefined;
  trainMessage: string | undefined;
  evaluateMessage: string | undefined;
  firstName :String | undefined ;
  msg = "";
  loan_terms = ['12','36','60','84','120','180','240','300','360'];
  predictMessage= "";
  

  constructor(private http: HttpClient) { }



  clickEvent(event: any){
    switch (event){
      case "preprocess":
        console.log("preprocessing the data");
        this.preprocess();
      break;

      case 'trainmodel':
        console.log("training the model");
        this.trainModel();
      break;

      case 'evaluateModel':
        console.log("evaluating the model");
        this.evaluateModel();
      break;
    }
  }
 
  evaluateModel() {

    this.http.get(BASEURL+"modelperformance").subscribe(response =>{
      console.log(response);
      if(response != null)
      {
       this.evaluateMessage = `${JSON.stringify(response)}`;
      }
    })
    // throw new Error('Method not implemented.');
  }
  trainModel() {
    this.trainMessage = "training the model..."
    this.http.get(BASEURL+"trainmodel").subscribe(response =>{
      console.log(response);
      if(response != null)
      {
       this.trainMessage = `${JSON.parse(JSON.stringify(response))}`;
      }
    })
    // throw new Error('Method not implemented.');
  }
  preprocess() {

    this.http.get(BASEURL+"preprocessdata").subscribe(response =>{
      console.log(response);
      if(response != null)
      {
       this.preprocessMessage = `${JSON.parse(JSON.stringify(response))}`;
      }
    })
    // throw new Error('Method not implemented.');
  }

  // printname(values: any){
  //   console.log("in the method -1");
  //   // if(this.firstName){
  //     console.log("in the method-2");
  //     this.msg = `the name is : ${values}`;
  //     // $scope.firstname = "John";
  //   // }
  // }

  onSubmit(form:any){
    if(form){
      const jsonReq = 
      {
        "Gender" : form.gender,
        "Married" : form.married,
        "Dependents" : form.dependents,
        "Education" : form.education,
        "Self_Employed" : form.Self_Employed,
        "ApplicantIncome" : form.ApplicantIncome,
        "CoapplicantIncome" : form.CoapplicantIncome,
        "LoanAmount" : form.LoanAmount,
        "Loan_Amount_Term" : form.LoanTerm,           
        "Credit_History" : form.Credit_History,
        "Property_Area" : form.Property_Area
      }
      this.msg =  JSON.stringify(jsonReq);

      this.http.post(BASEURL+"predict", jsonReq).subscribe(response =>{
        console.log(response);
        if(response != null)
        {
         this.predictMessage = `${JSON.parse(JSON.stringify(response))}`;
        }
      })
    }
  }

}
