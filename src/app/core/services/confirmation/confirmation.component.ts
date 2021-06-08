import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmation } from './iconfirmation';

@Component({
  selector: 'app-confirmation',
  template: ` <h1 mat-dialog-title>Atenção</h1>
    <mat-dialog-content>
      <p [innerHTML]="data.message"></p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">{{ data.cancelText }}</button>
      <button mat-button [color]="data.okColor" [mat-dialog-close]="true" cdkFocusInitial>{{ data.okText }}</button>
    </mat-dialog-actions>`,
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmation
  ) {}
}
