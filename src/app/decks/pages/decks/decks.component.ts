import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CardYugioh, Deck } from 'src/app/core/models/card.interface';
import { CardapiService } from 'src/app/core/services/cardapi.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent {
  decks$: Observable<Deck[]>;

  constructor(private cardApiService: CardapiService){
    this.decks$ = this.cardApiService.getDecks();
  }

  deleteDeck(i:number){
    this.cardApiService.deleteDeck(i);
  }

  delLocalStorage(){
    localStorage.clear()
  }
}
