import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
  <div class="dialog-wrap">
    <h2 class="title">
      <mat-icon aria-hidden="true" style="vertical-align: middle; margin-right:8px;">help</mat-icon>
      {{ data.title || 'Confirm' }}
    </h2>
    <div class="content">{{ data.message || 'Are you sure?' }}</div>
    <div class="actions">
      <button mat-button (click)="onCancel()">{{ data.cancelText || 'Cancel' }}</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">{{ data.confirmText || 'Delete' }}</button>
    </div>
  </div>
  `,
  styles: [`
    .dialog-wrap { max-width: 420px; }
    .title { margin: 0 0 8px; font-weight: 600; }
    .content { color: var(--muted); margin-bottom: 16px; }
    .actions { display: flex; justify-content: flex-end; gap: 8px; }
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
