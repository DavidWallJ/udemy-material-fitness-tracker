import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
            <mat-dialog-content>
              <p>You've completed {{ passedData.progress }}% of your workout</p>
            </mat-dialog-content>
            <mat-dialog-actions>
              <button mat-raised-button [mat-dialog-close]="true">Yes</button>
              <button mat-raised-button [mat-dialog-close]="false">No</button>
            </mat-dialog-actions>`
})
export class StopTrainingComponent {
  // this is how we get data from the 'this.dialog.open'
  // initiated in the 'current-training-component' template by the 'onStop' method
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
