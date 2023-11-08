import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Deck } from 'src/app/core/models/card.interface';
import { DeckService } from 'src/app/core/services/deck.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent {
  decks$: Observable<Deck[]>;

  constructor(private deckService: DeckService){
    this.decks$ = this.deckService.getDecks();
  }

  deleteDeck(i:number){
    this.deckService.deleteDeck(i);
  }

  delLocalStorage(){
    localStorage.clear()
  }
}
