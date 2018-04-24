import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.component.html'
})
export class StopTrainingComponent {
  // this is how we get data from the 'this.dialog.open'
  // initiated in the 'current-training-component' template by the 'onStop' method
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
