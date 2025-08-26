import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService, User } from '../user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatIconModule, MatButtonModule, MatSnackBarModule, MatProgressBarModule, MatProgressSpinnerModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDialogModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['name', 'email', 'phoneNumber', 'zipCode', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  errorMessage = '';
  totalCount = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private snack: MatSnackBar, private dialog: MatDialog) {}

  isLoading = false;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true
    this.userService.getUsers().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.totalCount = data.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage = err.message;
        this.isLoading = false;
        this.snack.open('Failed to load users', 'Close', { duration: 3000 });
      }
    });
  }

  applyFilter(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value?.trim().toLowerCase();
    this.dataSource.filter = value;
    this.totalCount = this.dataSource.filteredData.length;
  }

  deleteUser(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete user',
        message: 'Are you sure you want to delete this user? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.snack.open('User deleted', 'Close', { duration: 2000 });
          this.loadUsers();
        },
        error: err => {
          this.errorMessage = err.message;
          this.snack.open('Failed to delete user', 'Close', { duration: 3000 });
        }
      });
    });
  }
}
