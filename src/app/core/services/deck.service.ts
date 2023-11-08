import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardYugioh, Deck, MyCard } from '../models/card.interface';
import { CardapiService } from './cardapi.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  DECKS_IN_STORAGE = 'decks_in_storage';
  
  private _myCardsList$: MyCard[] = [];
  private items$: CardYugioh[] = [];

  private _decks: BehaviorSubject<Deck[]> = new BehaviorSubject<Deck[]>([]);
  private _currentDeck$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);
  private _currentDeckBase$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);

  constructor(private cardapiService: CardapiService) { }

  fetch(): void {
    let deckInStorage = localStorage.getItem(this.DECKS_IN_STORAGE);
    if(deckInStorage)
      this._decks.next(JSON.parse(deckInStorage));
    this.cardapiService.getMyCardsList().subscribe(data=>{
      this._myCardsList$ = data;
    });
    this.cardapiService.getItemsDraw().subscribe(x=>{
      this.items$ = x;
    });
  }
  
  getDecks(): Observable<Deck[]>{
    return this._decks.asObservable();
  }

  createDeck(name: string, description: string){
    localStorage.setItem(this.DECKS_IN_STORAGE,JSON.stringify([...this._decks.getValue(),{name,cards:[],description}]));
    this._decks.next([...this._decks.getValue(),{
      name: name,
      cards: [],
      description: description
    }]);
  }
  
  deleteDeck(id: number){
    let res = this._decks.getValue().filter((d,i)=> i !== id);
    this._decks.next(res);
    localStorage.setItem(this.DECKS_IN_STORAGE,JSON.stringify(res));
  }
  
  addCardToDeck(deckId: number,cardId: number){
    let newDecks = this._decks.getValue();
    let limit = 0;
    let limitElement = this._myCardsList$.find(c => c.id === cardId);
    if(limitElement){
      limit = limitElement.count;
    }
    let count = newDecks[deckId].cards.filter(c=>c.id === cardId);
    if(count.length < limit){
      newDecks[deckId].cards.push({
        id: cardId,
        Name: ""
      });
  
      let dataCards = this.items$;
      let newCardsForCurrentDeck: CardYugioh[] = [];
      newDecks[deckId].cards.forEach(c=>{
        newCardsForCurrentDeck.push(dataCards[c.id-1]);
      })
  
      this._decks.next(newDecks);
      this._currentDeck$.next(newCardsForCurrentDeck);
      this._currentDeckBase$.next(newCardsForCurrentDeck);
      /* console.log("new deck : ",newDecks,newCardsForCurrentDeck); */
      localStorage.setItem(this.DECKS_IN_STORAGE,JSON.stringify(newDecks));
    }else{
      console.log("Limite alcanzado");
    }
  }

  removeCardToDeck(deckId: number,cardId: number){
    let newDecks = this._decks.getValue();
    let noRemove = true;
    
    newDecks[deckId].cards = newDecks[deckId].cards.filter(c => {
      if(noRemove){
        if(c.id !== cardId){
          return true;
        }else{
          noRemove = false;
          return false;
        }
      }else{
        return true;
      }
    } );
    noRemove = true;
    let newCardsForCurrentDeck: CardYugioh[] = this._currentDeckBase$.getValue().filter(c => {
      if(noRemove){
        if(c.id !== cardId){
          return true;
        }else{
          noRemove = false;
          return false;
        }
      }else{
        return true;
      }
    });

    
    this._decks.next(newDecks);
    this._currentDeck$.next(newCardsForCurrentDeck);
    this._currentDeckBase$.next(newCardsForCurrentDeck);
    localStorage.setItem(this.DECKS_IN_STORAGE,JSON.stringify(newDecks));
  }

  //handle current deck
  getCurrentDeck(): Observable<CardYugioh[]>{
    return this._currentDeck$.asObservable();
  }
  
  getTotalOfCurrentDeck(cardId: number):number{
    let total = 0;
    let cards = this._currentDeckBase$.getValue().filter(c => c.id === cardId);
    if(cards){
      total = cards.length;
    }
    return total;
  }
  
  setCurrentDeck(deckId: number){
    let newCardsForCurrentDeck: CardYugioh[] = [];
    let dataCards = this.items$;
    this._decks.getValue()[deckId].cards.forEach(c => {
      newCardsForCurrentDeck.push(dataCards[c.id-1]);
    });
    this._currentDeck$.next(newCardsForCurrentDeck);
    this._currentDeckBase$.next(newCardsForCurrentDeck);
  }

  //filter cards of deck
  filterCards(obj: any): void{
    /* console.log("inicio filtro") */
    let res = [...this._currentDeckBase$.getValue()];

    if(obj.filters){
      res = res.filter(card => {
        if(obj.filters.monsters && card.monster)return true;
        if(obj.filters.magics && card.magic)return true;
        if(obj.filters.traps && card.trap)return true;
        if(obj.filters.rituals && card.ritual)return true;
        return false;
      });
    }
    if(obj.search){
      res = res.filter(card => {
        if(card.Type?.toLowerCase().includes(obj.search.toLowerCase())){
          return true;
        }else if(card['Guardian Star']?.toLowerCase().includes(obj.search.toLowerCase())){
          return true;
        }else{
          return card.Name?.toLowerCase().includes(obj.search.toLowerCase());
        }
      })
    }
    if(obj.order){
      if(obj.order === 'id')
        res.sort((a, b) => ((a.id as number) > (b.id as number)) ? obj.ascending*1 : obj.ascending*(-1))
      else if(obj.order === 'name')
        res.sort((a, b) => ((a.Name as string) > (b.Name as string)) ? obj.ascending*1 : obj.ascending*(-1))
      else if(obj.order === 'atk')
        res.sort((a, b) => {
          if(a.monster && b.monster){
            if((a.ATK as number) > (b.ATK as number)){
              return obj.ascending*1;
            }else{
              return obj.ascending*(-1);
            }
          }else if(!a.monster){
            return 1;
          }else{
            return -1;
          }
        })
      if(obj.order === 'def')
        res.sort((a, b) => {
          if(a.monster && b.monster){
            if((a.DEF as number) > (b.DEF as number)){
              return obj.ascending*1;
            }else{
              return obj.ascending*(-1);
            }
          }else if(!a.monster){
            return 1;
          }else{
            return -1;
          }
        })
    }
    
    this._currentDeck$.next(res);
    /* console.log("termino filtro",res) */
  }
}
