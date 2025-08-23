import { Component, OnInit } from '@angular/core';  
import { User, UserService } from '../user.service';  
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
  
@Component({  
  selector: 'app-user-list',  
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html'  
})  
export class UserListComponent implements OnInit {  
  users: User[] = [];  
  errorMessage: string = '';  
  
  constructor(private userService: UserService) { }  
  
  ngOnInit() {  
    this.loadUsers();  
  }  
  
  loadUsers() {  
    this.userService.getUsers().subscribe({  
      next: data => this.users = data,  
      error: err => this.errorMessage = err.message  
    });  
  }  
  
  deleteUser(id: number) {  
    if (confirm('Are you sure you want to delete this user?')) {  
      this.userService.deleteUser(id).subscribe({  
        next: () => this.loadUsers(),  
        error: err => this.errorMessage = err.message  
      });  
    }  
  }  
}  