import { Component } from '@angular/core';
//import * as alaSQLSpace from 'alasql';
import alasql from 'alasql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-alasql';

  ngOnInit(){
    //this.testAlaSQLExcelExport();
  }
  //inputs
  firstname=null;
  lastname=null;
  age=null;
  city=null;

  //array item2
  mydata = [];

  pushdata(){
    if(this.check_inputs()){
      this.mydata.push({
        firstname : this.firstname,
        lastname : this.lastname,
        age : this.age,
        city : this.city
      });   
      this.clear();
    }    
  }

  clear(){
    this.firstname=null;
    this.lastname=null;
    this.age=null;
    this.city=null;
  }

  cleardata(){
    this.mydata=[];
  }

  check_inputs(){    
    if( this.firstname && this.lastname && this.age>0 && this.city)
      return true;
    return false;
  }

   
  public alaSQLExcelExport(): void {     

    var opts = [
      { sheetid: 'order by first name', header: true }, 
      { sheetid: 'order by last name', header: false },
      { sheetid: 'order by age', header: false },
      { sheetid: 'order by city', header: false },
    ]; 

    alasql('SELECT INTO XLSX("My_Generated_Data.xlsx",?) FROM ?',
        [opts, 
          [
            this.mydata.sort((a, b) => {
              if (a.firstname > b.firstname) {
                return -1;
              }
            }), 
            this.mydata.sort((a, b) => {
              if (a.lastname > b.lastname) {
                return -1;
              }
            }), 
            this.mydata.sort((a, b) => {
              if (a.age > b.age) {
                return -1;
              }
            })
            , 
            this.mydata.sort((a, b) => {
              if (a.city > b.city) {
                return -1;
              }
            })
          ]
        ]);
    
 }
}
