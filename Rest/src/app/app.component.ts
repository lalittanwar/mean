import { Component } from '@angular/core';
import {NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxUiLoaderModule,NgxUiLoaderRouterModule,NgxUiLoaderConfig,SPINNER } from  'ngx-ui-loader';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mylogin';
  isAdmin:boolean;

 constructor(private spinner: NgxSpinnerService, private auths:AuthService) { }
 
  ngOnInit() {
    this.isAdmin=this.auths.isadmin;
    this.spinner.show();
    setTimeout(() => {
        this.spinner.hide();
    }, 2000);
  }
  
 /*  config: NgxUiLoaderConfig;

  constructor(private ngxService: NgxUiLoaderService) { 
  
  }
 ngOnInit() {
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);

} */
}
