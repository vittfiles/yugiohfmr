import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShowComponent } from './card-show.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    CardShowComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    CommonModule,
    CardShowComponent
  ]
})
export class CardShowModule { }
