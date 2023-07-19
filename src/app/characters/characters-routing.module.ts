import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './page/characters/characters.component';
import { CharactersShowComponent } from './page/characters-show/characters-show.component';

const routes: Routes = [
  {
    path: '',
    component: CharactersComponent
  },
  {
    path: ':id',
    component: CharactersShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
