import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DecksRoutingModule } from './decks-routing.module';
import { DecksComponent } from './pages/decks/decks.component';
import { MaterialModule } from '../material.module';
import { CreateDeckComponent } from './pages/create-deck/create-deck.component';
import { EditDeckComponent } from './pages/edit-deck/edit-deck.component';
import { CardShowModule } from '../shared/card-show/card-show.module';


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
    CardShowModule
  ]
})
export class DecksModule { }
