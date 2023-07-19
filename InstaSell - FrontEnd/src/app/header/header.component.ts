import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  roles: any;
  flag2:boolean=false;
  flag3:boolean=false;
  userName:any;
  numOfProducts:any;
  
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private tokenStorageService: TokenStorageService,
    private token: TokenStorageService
  ) {
    localStorage.setItem('name', 'currentUser.username');
    console.log(this.currentUser);
    
   
  }

 

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    // this.roles = this.tokenStorageService.getUser().roles;
    // const flag = localStorage.getItem('flag');
    // const userName = localStorage.getItem('name');
    console.log(this.currentUser.username);
    localStorage.setItem('name',this.currentUser.username);
    localStorage.setItem('flag3','false')
    const flag = localStorage.getItem('flag'); 
    if(flag==="true")
    {
      this.flag2=true;

    }
    else{
      this.flag2=false;
    }
    const role = localStorage.getItem('role'); 
    if(role==="admin")
    {
      this.flag3=true;

    }
    else{
      this.flag3=false;
    }

    // this.role="user";
   this.numOfProducts = localStorage.getItem('numOfProducts');
    console.log('Number of products:', this.numOfProducts);
  }
 
    
    

  public isLoggedIn() {
    
    return this.userAuthService.isLoggedIn();
  }

  logout(): void {
    localStorage.setItem('flag', 'false');
    this.flag3=false;
    this.tokenStorageService.signOut();
   
    localStorage.setItem('role', 'user');
    window.location.reload();
    localStorage.setItem('flag', 'false');

    
   

  }

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }
  login():void{
    localStorage.setItem('flag', 'true');
    
    
  }
  

}
