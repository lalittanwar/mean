import { Component, OnInit,Input } from '@angular/core';
import {FoodService} from  '../food.service';
import { NgxSpinnerService } from 'ngx-spinner';
import  {Food} from '../food';
import {User} from '../user';
import{AuthService} from '../auth.service';
import{LoginService} from '../login.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  @Input() p;
showFood = false;
showpayment=false;
foods:any;
//fooda:Food[];
id:Number;
name:String;
price:Number;
users:{};
isAdmin:Boolean;
  constructor(private fs:FoodService,private spinner: NgxSpinnerService,private auths:AuthService,private logins:LoginService) { }

  ngOnInit() { 
      console.log(this.auths.isadmin)
      this.isAdmin=this.auths.isadmin;
      console.log(this.isAdmin);
      this.get();
      this.auths.getUser()
      .subscribe(user=>this.users=user)

      console.log(JSON.stringify(this.users))
      this.spinner.show();
      setTimeout(() => {
          this.spinner.hide();
      }, 1000);
  }


  get(){
    this.fs.getFood()
    .subscribe(foods=>this.foods=foods)
  }

  add(myform){
    const newFood:Food={
      id:myform.value.id,
      name:myform.value.name,
      price:myform.value.price
     }
     this.fs.addFood(newFood)
     .subscribe(food=>
      { this.foods.push(food);
        console.log(newFood);
        console.log(food);
        this.get();
        console.log(food);
      })
  }

 /* deleted(f){
    console.log(f.id);
    this.fs.deleteFood(f.id)
    .subscribe(data=>{
      
      this.foods.splice(f.id-1,1)
    })
  }*/

  deleted(id1:any){
    console.log(id1);
    var foods=this.foods;


    this.fs.deleteFood(id1)
    .subscribe(data=>{ 
       //if(data.n==1) 
       for(var i=0;i<foods.length;i++){
       if(foods[i]._id==id1){
      foods.splice(i,1);
      break;
       }
       }
})
  }
  
  // add(f){
  //   this.showFood=true;
  //   this.fd=JSON.stringify(f);
  //   console.log(f.id);
  //   //console.log(this.fd);
  //   console.log(this.food[f.id-1]);
  //   //var fl=this.food.length;
  //   //console.log(fl);
  //  //this.food1.splice(f.id,fl-1);
  //   //var i=f.id-1;
  //  this.food1.push(
  //   {
  //    "id":f.id,
  //    "name":f.name,
  //    "price":f.price
  //   });
  //   console.log(this.food1[f.id-1]);
  //  // this.c=f.price;
  //   this.c=this.c+f.price;
  //   console.log(this.c);
  // }


  // onCheckout(){
  //   this.showpayment=true;
    
  // }
}
