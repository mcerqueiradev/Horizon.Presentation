import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LoginModel } from '../model/login';
import { UserModel } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: LoginModel;
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService, private httpClient: HttpClient) {
    this.loginObj = new LoginModel();
  }

  onLogin() {
    this.userService.login(this.loginObj).subscribe((res: LoginModel) => {
      // Verifica se o objeto retornado não é nulo
      if (res != null) {

        sessionStorage.setItem('loggedUser', JSON.stringify(res));

        // Extrai o userId do objeto retornado após o login
        const userId = res.userId;

        alert("Login successful!");
        this.userService.getUserDetails(userId).subscribe({
          next: (userDetails: UserModel) => {
            // Armazena os detalhes completos do usuário no sessionStorage
            sessionStorage.setItem('loggedUserDetails', JSON.stringify(userDetails));
            
            // Redireciona para a página de dashboard em caso de sucesso
            this.router.navigateByUrl('/dashboard');
          },
          error: (error) => {
            console.error('Erro ao buscar detalhes do usuário:', error);
            // Em caso de erro ao buscar os detalhes do usuário, exibe uma mensagem de erro e não redireciona
            alert("Failed to fetch user details. Please try again later.");
          }
        });
      } else {
        alert("Login failed. Please check your credentials.");
      }
    }, (error) => {
      // Caso ocorra um erro na solicitação
      console.error("An error occurred during login:", error);
      alert("An error occurred during login. Please try again later.");
    });
  }
}
