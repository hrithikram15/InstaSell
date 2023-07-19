// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserAuthService } from '../_services/user-auth.service';
// import { UserService } from '../_services/user.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   constructor(
//     private userService: UserService,
//     private userAuthService: UserAuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {}

 
//   login(loginForm: NgForm) {
//     console.log(loginForm.value);
//     this.userService.login(loginForm.value).subscribe(
//       (response) => {
//         this.router.navigate(['/user']);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }

//   registerUser(){
//     this.router.navigate(['/register']);
//   }
// }




import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  name:string="";

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      // 
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        // console.log(this.roles);
        this.name=this.tokenStorage.getUser()
        localStorage.setItem('flag', 'true');
        if (this.roles.includes('ROLE_ADMIN')) {
          // Code to be executed if the user has the "ROLE_ADMIN" role
          this.router.navigate(['']);
          localStorage.setItem('role', 'admin');
          this.reloadPage();

          
        }
        else{
          this.router.navigate(['']);
          localStorage.setItem('role', 'user');
          this.reloadPage();
        }
        
        
        // this.reloadPage();
        // this.router.navigate(['/dashboard']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
