import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//  private url="http://localhost:3000/api/register";
 // private lurl="http://localhost:3000/api/login";

  private url="/api/register";
  private lurl="/api/login";

  isadmin:boolean;
  
  constructor(private http:HttpClient,private route:Router) { }
  
  getUser(){
    return this.http.get('/api/user')
    //.map(res=>res.json());
  }

  regUser(user){
    return this.http.post<any>(this.url,user);
  }

  loginuser(user){
    return this.http.post<any>(this.lurl,user);
  }

  loggedin(){
    return !!localStorage.getItem('token')
  }

  logoutuser(){
    localStorage.removeItem('token');
    this.route.navigate(['\login']);

  }
  getToken(){
    return localStorage.getItem('token')
  }

}
