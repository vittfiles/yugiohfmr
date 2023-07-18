import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MyCardsRoutingModule } from './my-cards-routing.module';
import { MyCardsComponent } from './pages/my-cards/my-cards.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { DialogCardModule } from '../shared/dialog-card/dialog-card.module';
import { CardShowModule } from '../shared/card-show/card-show.module';


@NgModule({
  declarations: [
    MyCardsComponent
  ],
  imports: [
    CommonModule,
    MyCardsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DialogCardModule,
    CardShowModule
  ]
})
export class MyCardsModule { }
