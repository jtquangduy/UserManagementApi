import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title class="title">
      <mat-icon aria-hidden="true" class="leading-icon">help</mat-icon>
      {{ data.title || 'Confirm' }}
    </h2>

    <div mat-dialog-content class="content">
      {{ data.message || 'Are you sure?' }}
    </div>

    <div mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">
        {{ data.cancelText || 'Cancel' }}
      </button>
      <button mat-raised-button color="warn" (click)="onConfirm()" cdkFocusInitial>
        {{ data.confirmText || 'Delete' }}
      </button>
    </div>
  `,
  styles: [`
    .title { display: flex; align-items: center; gap: 8px; margin: 0; }
    .leading-icon { vertical-align: middle; }
    .content { margin-top: 4px; }
    /* Không dùng CSS variables để tránh phụ thuộc theme tự define */
    /* Nếu muốn màu “nhạt” cho nội dung, dùng opacity nhẹ */
    .content { opacity: .8; }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm() { this.dialogRef.close(true); }
  onCancel() { this.dialogRef.close(false); }
}
