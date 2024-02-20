import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-retrieve-all',
  templateUrl: './retrieve-all.component.html',
  styleUrls: ['./retrieve-all.component.css']
})
export class RetrieveAllComponent implements OnInit {
  users: UserModel[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.retrieveAll();
  }

  retrieveAll() {
    this.userService.retrieveAll().subscribe({
      next: (data: UserModel[]) => {
        this.users = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  } 
  
}