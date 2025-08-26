import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCardModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId?: number;
  errorMessage: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
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
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.snack.open('Please fix validation errors', 'Close', { duration: 2500 });
      return;
    }

    this.isSubmitting = true;
    if (this.isEditMode && this.userId) {
      const userData: User = { ...this.userForm.value, id: this.userId };
      this.userService.updateUser(this.userId, userData).subscribe({
        next: () => {
          this.snack.open('User updated', 'Close', { duration: 2000 });
          this.router.navigate(['']);
        },
        error: err => {
          this.errorMessage = err.message;
          this.snack.open('Failed to update user', 'Close', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    } else {
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.snack.open('User created', 'Close', { duration: 2000 });
          this.router.navigate(['']);
        },
        error: err => {
          this.errorMessage = err.message;
          this.snack.open('Failed to create user', 'Close', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
