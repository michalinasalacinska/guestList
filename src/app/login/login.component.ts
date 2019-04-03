import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  changedName = false;
  changedPassword = false;

  loggedUser = null;

  //these two are binded using two-way data binding
  userName = '';
  userPassword = '';

  errorContent = '';

  currentUser = null;

  constructor(private router: Router) { }

  //check if user login changed, needed for styling
  onName(e:KeyboardEvent) {
    this.dataIput(e, 'changedName')
  }

  //check if user password changed, needed for styling
  onPass(e:KeyboardEvent) {
    this.dataIput(e, 'changedPassword')
  }

  dataIput(e:any, changeIt:string) {
    this[changeIt] = e.target.value.length >= 1;
    if (this.errorContent !== '') this.errorContent = '';
  }

  loginFailed(e: Parse.Error) {
    if (e.code === 101) this.errorContent = 'Incorrect user login or password';
    else if (e.code === 200) this.errorContent = 'Login is required';
    else if (e.code === 201) this.errorContent = 'Password is required';
    else this.errorContent = 'Oops, something went wrong. Please try again after 5 minutes';
  }

  async onSubmit(e) {
    e.preventDefault();
    const user = await Parse.User.logIn(this.userName, this.userPassword).catch(e => {
      this.loginFailed(e);
    });
    
    if(user) {
      this.router.navigate(['/dashboard']);
    }

  }

  ngOnInit() {
  }

}
