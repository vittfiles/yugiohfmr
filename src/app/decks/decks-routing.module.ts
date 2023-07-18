import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecksComponent } from './pages/decks/decks.component';
import { CreateDeckComponent } from './pages/create-deck/create-deck.component';
import { EditDeckComponent } from './pages/edit-deck/edit-deck.component';

const routes: Routes = [{
  path: "",
  component: DecksComponent
},
{
  path: "create",
  component: CreateDeckComponent
},
{
  path: "edit/:id",
  component: EditDeckComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksRoutingModule { }
