import { Component } from '@angular/core';
import { SignUp } from '../model/signUp';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signUpObj : SignUp = new SignUp();

  onRegister() {
    debugger;
    const localUsers = localStorage.getItem('angular17users');
    if(localUsers != null)
    {
      const users = JSON.parse(localUsers);
      users.push(this.signUpObj);
      localStorage.setItem('angular17users' , JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('angular17users' , JSON.stringify(users));
    }
    alert("Registration Success!");
  }
}
