import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../user/model/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: UserModel | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
      if (typeof sessionStorage !== 'undefined' && sessionStorage !== null) {

        const userData = sessionStorage.getItem('loggedUserDetails');

        if (userData) {  
        
          this.user = JSON.parse(userData);
  
          if (this.user?.userId) {

            console.log('Valor de this.user.id:', this.user.userId);

            // Chama o serviço para obter os detalhes completos do usuário
            this.userService.getUserDetails(this.user.userId).subscribe({
              next: (userDetails: UserModel) => {
                // Preenche o objeto UserModel com os detalhes do usuário
                if (this.user) {
                  // Verifica se as propriedades de nome estão definidas
                  this.user.firstName = userDetails.firstName ?? this.user.firstName;
                  this.user.lastName = userDetails.lastName ?? this.user.lastName;
                  this.user.id = userDetails.userId;
                }
                // Preencha outras propriedades conforme necessário
          
                // Armazena os detalhes do usuário atualizados em sessionStorage
                sessionStorage.setItem('loggedUserDetails', JSON.stringify(this.user));
              },
              error: (error) => {
                console.error('Erro ao obter detalhes do usuário:', error);
              }
            });
          }
        } else {
          // Trata o caso em que não há dados de usuário (talvez o usuário não esteja logado)
          // Aqui você pode redirecionar o usuário para a página de login ou tomar outra ação adequada.
        }
      } else {
        console.error('O sessionStorage não está disponível neste ambiente.');
      }
  }
  
  
  logOut() {
    sessionStorage.removeItem('loggedUser');
    sessionStorage.removeItem('loggedUserDetails');
    this.router.navigateByUrl('/login');
  }
  
}
