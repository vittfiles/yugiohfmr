import { Component, OnInit } from '@angular/core';
import { CardapiService } from './core/services/cardapi.service';
import { CharactersService } from './core/services/characters.service';
import { DeckService } from './core/services/deck.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'yugiohfmr';
 /*  cards$: Observable<CardYugioh[]>; */

  constructor(
    private cardApiService: CardapiService,
    private charactersService: CharactersService,
    private deckService: DeckService){
  }

  ngOnInit(): void {
    this.cardApiService.fetchList();
    this.charactersService.fetchList();
    this.deckService.fetch();
  }
}
