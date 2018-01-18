import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';

@Component({
  selector: 'progress-spinner',
  templateUrl: 'progress-spinner.component.html',
  styleUrls: ['progress-spinner.component.scss'],
})

export class ProgressSpinner {
  public color: string = 'primary';
  public mode: string = 'determinate';
  public value: number = 50;
}
