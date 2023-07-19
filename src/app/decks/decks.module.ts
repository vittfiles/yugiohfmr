import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DecksRoutingModule } from './decks-routing.module';
import { DecksComponent } from './pages/decks/decks.component';
import { MaterialModule } from '../material.module';
import { CreateDeckComponent } from './pages/create-deck/create-deck.component';
import { EditDeckComponent } from './pages/edit-deck/edit-deck.component';
import { CardShowModule } from '../shared/card-show/card-show.module';
import { DialogCardModule } from '../shared/dialog-card/dialog-card.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DecksComponent,
    CreateDeckComponent,
    EditDeckComponent
  ],
  imports: [
    CommonModule,
    DecksRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CardShowModule,
    DialogCardModule,
    FormsModule
  ]
})
export class DecksModule { }
