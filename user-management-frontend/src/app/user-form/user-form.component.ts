import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute, Router } from '@angular/router';  
import { UserService, User } from '../user.service';  
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  
import { CommonModule } from '@angular/common';
  
@Component({  
  selector: 'app-user-form',  
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html'  
})  
export class UserFormComponent implements OnInit {  
  userForm: FormGroup;  
  isEditMode = false;  
  userId?: number;  
  errorMessage: string = '';  
  
  constructor(  
    private fb: FormBuilder,  
    private userService: UserService,  
    private route: ActivatedRoute,  
    private router: Router  
  ) {  
    this.userForm = this.fb.group({  
      firstName: ['', [Validators.required, Validators.maxLength(50)]],  
      lastName: ['', [Validators.required, Validators.maxLength(50)]],  
      email: ['', [Validators.required, Validators.email]],  
      phoneNumber: [''],  
      zipCode: ['']  
    });  
  }  
  
  ngOnInit() {  
    this.route.paramMap.subscribe(params => {  
      const idParam = params.get('id');  
      if (idParam) {  
        this.isEditMode = true;  
        this.userId = +idParam;  
        this.loadUser(this.userId);  
      }  
    });  
  }  
  
  loadUser(id: number) {  
    this.userService.getUser(id).subscribe({  
      next: user => this.userForm.patchValue(user),  
      error: err => this.errorMessage = err.message  
    });  
  }  
  
  onSubmit() {  
    if (this.userForm.invalid) return;  
  
    const userData = this.userForm.value;  
    if (this.isEditMode && this.userId) {  
      const userData: User = { ...this.userForm.value, id: this.userId };
      this.userService.updateUser(this.userId, userData).subscribe({  
        next: () => this.router.navigate(['']),  
        error: err => this.errorMessage = err.message  
      });  
    } else {  
      this.userService.createUser(userData).subscribe({  
        next: () => this.router.navigate(['']),  
        error: err => this.errorMessage = err.message  
      });  
    }  
  }  
  
  cancel() {  
    this.router.navigate(['/']);  
  }  
}  