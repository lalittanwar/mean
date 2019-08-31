import { Component, OnInit } from '@angular/core';
import {FormsModule}  from '@angular/forms';
import {LoginService} from  '../login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthService} from '../auth.service';
import{User} from '../user'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  submitted=false;
  show=false;
  public user=[];
  d:any=[];
  public uname_get:boolean;
  public ll;
  userarray:any=[];
   id:number;
   name: string;
   email: string;
   password:string;
   phone:number;
   dob :Date;

  //reguserdata={};
  
  constructor(private logins:LoginService,private auths:AuthService, private spinner: NgxSpinnerService) { 
    this.uname_get=this.logins.getData();
    
  //this.logins.getData().subscribe(Data => this.uname_get=Data);
    //console.log(this.uname_get);
  }

  ngOnInit() {
    /*const keys=Object.keys(localStorage);
    for (var i = 0; i<localStorage.length; i++) {
   //console.log(JSON.parse(localStorage.getItem(keys[i])));
     this.user.push(JSON.parse(localStorage.getItem(keys[i])));
     this.ll= localStorage.length+1;
     //console.log(this.ll);
*/
     this.spinner.show();
     setTimeout(() => {
         this.spinner.hide();
     }, 1000);

}
  
  onSubmit(myForm){
    this.submitted=true;
    this.show=true;
    //localStorage.setItem(myForm.id,JSON.stringify(myForm));
    const newuser:User={
      id:myForm.value.id,
      name:myForm.value.name,
      email:myForm.value.email,
      phone:myForm.value.phone,
      password:myForm.value.password,
      dob:myForm.value.dob,
      isAdmin:myForm.value.isAdmin
     }
    this.auths.regUser(newuser)
    .subscribe(user=>
      {
      this.userarray.push(user);
      console.log(user);
      console.log(newuser);
      console.log(this.userarray);
      //localStorage.setItem('token',user.token);
        //this.router.navigate(['/special'])
      },
      err=>console.log(err)
    )
  }

  }

  



