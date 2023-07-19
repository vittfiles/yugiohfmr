import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path: 'decks',
    loadChildren: ()=> import('./decks/decks.module').then(m=>m.DecksModule)
  },
  {
    path: 'my-cards',
    loadChildren: ()=> import('./my-cards/my-cards.module').then(m=>m.MyCardsModule)
  },
  {
    path: 'characters',
    loadChildren: ()=> import('./characters/characters.module').then(m=>m.CharactersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
