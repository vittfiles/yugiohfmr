import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCardComponent } from './dialog-card.component';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    DialogCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    CommonModule
  ]
})
export class DialogCardModule { }
