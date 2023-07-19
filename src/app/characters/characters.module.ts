import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './page/characters/characters.component';
import { CharactersShowComponent } from './page/characters-show/characters-show.component';
import { MaterialModule } from '../material.module';
import { CardShowModule } from '../shared/card-show/card-show.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogCardModule } from '../shared/dialog-card/dialog-card.module';


@NgModule({
  declarations: [
    CharactersComponent,
    CharactersShowComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CardShowModule,
    DialogCardModule,
    FormsModule
  ]
})
export class CharactersModule { }
