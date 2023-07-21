import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardCharacterShow, CardYugioh, Character, CharacterShow, Deck, MyCard } from '../models/card.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardapiService {
  DECKS_IN_STORAGE = 'decks_in_storage';
  MY_CARDS_IN_STORAGE = 'my_cards_in_storage';
  ITEMS_URL = 'assets/cards2.json';
  CHARACTERS_URL = 'assets/characters.json';

  private readonly items$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);
  private readonly _cards$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);
  private readonly _myCards$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);
  private readonly _myCardsList$: BehaviorSubject<MyCard[]> = new BehaviorSubject<MyCard[]>([]);
  
  private _decks: BehaviorSubject<Deck[]> = new BehaviorSubject<Deck[]>([]);
  private _currentDeck$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);
  private _currentDeckBase$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);
  
  private _characters$: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
  private _currentCharacterBase$: BehaviorSubject<CardCharacterShow[]> = new BehaviorSubject<CardCharacterShow[]>([]);
  private _currentCharacter$: BehaviorSubject<CardCharacterShow[]> = new BehaviorSubject<CardCharacterShow[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  fetchList() {
    this.httpClient.get<CardYugioh[]>(this.ITEMS_URL).pipe(
      map(res => {
        res.forEach(card=>{
          let stars = card['Guardian Star']?.split('\n');
          if(stars){
            card.guardian1 = stars[0] || "";
            card.guardian2 = stars[1] || "";
          }
          card.id = Number.parseInt(card.id as string);
          card.src = "assets/imgCard/"+ card.id + "-data.png";
          card.monster = this.typeMonster(card);
          card.magic = this.typeMagic(card);
          card.trap = this.typeTrap(card);
          card.ritual = this.typeRitual(card);
          if(card.ATK){
            card.ATK = Number.parseInt(card.ATK as string);
          }else{
            card.ATK = 99999;
          }
          if(card.DEF){
            card.DEF = Number.parseInt(card.DEF as string);
          }else{
            card.DEF = 99999;
          }
        });
        return res;
      })
    ).subscribe(receivedItems => {
      this.items$.next(receivedItems);
      this._cards$.next(receivedItems);
      this._myCards$.next(receivedItems);
    });

    this.httpClient.get<Character[]>(this.CHARACTERS_URL).subscribe(receivedCharacters=> this._characters$.next(receivedCharacters));
    
    let deckInStorage = localStorage.getItem(this.DECKS_IN_STORAGE);
    if(deckInStorage)
      this._decks.next(JSON.parse(deckInStorage));
    
    let myCardsInStorage = localStorage.getItem(this.MY_CARDS_IN_STORAGE);
    if(myCardsInStorage)
      this._myCardsList$.next(JSON.parse(myCardsInStorage));
  }
  addCardToDeck(deckId: number,cardId: number){
    let newDecks = this._decks.getValue();
    let limit = 0;
    let limitElement = this._myCardsList$.getValue().find(c => c.id === cardId);
    if(limitElement){
      limit = limitElement.count;
    }
    let count = newDecks[deckId].cards.filter(c=>c.id === cardId);
    if(count.length < limit){
      newDecks[deckId].cards.push({
        id: cardId,
        Name: ""
      });
  
      let dataCards = this.items$.getValue();
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
  getCharacters(): Observable<Character[]> {
    return this._characters$.asObservable();
  }
  getCurrentCharacter(position: number): Observable<CardCharacterShow[]>{
    let cardsValues = this.items$.getValue();
    let values = this._characters$.getValue()[position];
    /* let name = values[position].name;
    let src = values[position].src; */

    let data: CardCharacterShow[] = [];
    values.deck.forEach(c=>{
      data.push({
        id: c.id,
        name: c.name,
        chance100: c.chance100,
        chance2048: c.chance2048,
        card: cardsValues.find(e => e.id === c.id) || cardsValues[0]
      });
    });
    this._currentCharacter$.next(data);
    this._currentCharacterBase$.next(data);
    return this._currentCharacter$.asObservable();
  }

  getItemsDraw(): Observable<CardYugioh[]> {
    return this.items$.asObservable();
  }

  getItems(): Observable<CardYugioh[]> {
    return this._cards$.asObservable();
  }
  getMyCards(): Observable<CardYugioh[]> {
    return this._myCards$.asObservable();
  }
  getMyCardsList(): Observable<MyCard[]> {
    return this._myCardsList$.asObservable();
  }
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
    let dataCards = this.items$.getValue();
    this._decks.getValue()[deckId].cards.forEach(c => {
      newCardsForCurrentDeck.push(dataCards[c.id-1]);
    });
    this._currentDeck$.next(newCardsForCurrentDeck);
    this._currentDeckBase$.next(newCardsForCurrentDeck);
  }

  addCardMyCardList(id:number){
    let cardExist = this._myCardsList$.getValue().find(card=> card.id === id);
    if(cardExist){
      if(cardExist.count < 3){
        let restOfCards = this._myCardsList$.getValue().filter(card=> card.id !== id);
        this._myCardsList$.next([...restOfCards,{
          id: cardExist.id,
          count: (cardExist.count + 1)
        }]);
      }
    }else{
      this._myCardsList$.next([...this._myCardsList$.getValue(),{
        id: id,
        count: 1
      }]);
    }
    localStorage.setItem(this.MY_CARDS_IN_STORAGE,JSON.stringify(this._myCardsList$.getValue()));
    console.log(this._myCardsList$.getValue());
  }
  removeCardMyCardList(id:number){
    let cardExist = this._myCardsList$.getValue().find(card=> card.id === id);
    if(cardExist){
      if(cardExist.count > 1){
        let restOfCards = this._myCardsList$.getValue().filter(card=> card.id !== id);
        this._myCardsList$.next([...restOfCards,{
          id: cardExist.id,
          count: (cardExist.count - 1)
        }]);
      }else{
        this._myCardsList$.next([...(this._myCardsList$.getValue().filter(card=> card.id !== id))]);
      }
    }
    localStorage.setItem(this.MY_CARDS_IN_STORAGE,JSON.stringify(this._myCardsList$.getValue()));
    console.log(this._myCardsList$.getValue());
  }

  filterCards(obj: any): void{
    /* console.log("inicio filtro") */
    let res = [];
    if(obj.currentDeck){
      res = [...this._currentDeckBase$.getValue()];
    }else{
      res = [...this.items$.getValue()];
    }

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
    
    if(obj.myCards){
      res = res.filter(card => {
        if(this._myCardsList$.getValue().find(mycard=> mycard.id === card.id))return true;
        return false;
      });
      this._myCards$.next(res);
    }else if(obj.currentDeck){
      this._currentDeck$.next(res);
    }else{
      this._cards$.next(res);
    }
    /* console.log("termino filtro",res) */
  }
  filterCharacterCards(obj: any): void{
    /* console.log("inicio filtro") */
    let res = [...this._currentCharacterBase$.getValue()];

    if(obj.filters){
      res = res.filter(card => {
        if(obj.filters.monsters && card.card.monster)return true;
        if(obj.filters.magics && card.card.magic)return true;
        if(obj.filters.traps && card.card.trap)return true;
        if(obj.filters.rituals && card.card.ritual)return true;
        return false;
      });
    }
    if(obj.search){
      res = res.filter(card => {
        return card.card.Name?.toLowerCase().includes(obj.search.toLowerCase());
      })
    }
    if(obj.order){
      if(obj.order === 'id')
        res.sort((a, b) => ((a.id as number) > (b.id as number)) ? obj.ascending*1 : obj.ascending*(-1))
      else if(obj.order === 'name')
        res.sort((a, b) => ((a.card.Name as string) > (b.card.Name as string)) ? obj.ascending*1 : obj.ascending*(-1))
      else if(obj.order === 'atk')
        res.sort((a, b) => {
          if(a.card.monster && b.card.monster){
            if((a.card.ATK as number) > (b.card.ATK as number)){
              return obj.ascending*1;
            }else{
              return obj.ascending*(-1);
            }
          }else if(!a.card.monster){
            return 1;
          }else{
            return -1;
          }
        })
      else if(obj.order === 'def')
        res.sort((a, b) => {
          if(a.card.monster && b.card.monster){
            if((a.card.DEF as number) > (b.card.DEF as number)){
              return obj.ascending*1;
            }else{
              return obj.ascending*(-1);
            }
          }else if(!a.card.monster){
            return 1;
          }else{
            return -1;
          }
        })
      else if(obj.order === '100')
        res.sort((a, b) => (a.chance100 > b.chance100) ? obj.ascending*1 : obj.ascending*(-1))
    }
    
    this._currentCharacter$.next(res);
    /* console.log("termino filtro",res) */
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
/*   deleteMazo(position: number){
    if(position < this._decks.length){
      this._decks.
    }
  }

  addCardToMazo(card: CardYugioh, position: number = 0){
    this._decks[position].cards.push({
      id: card.id as number,
      Name: card.Name as string,
      src: card.src as string
    });
  } */
  deleteDeck(id: number){
    let res = this._decks.getValue().filter((d,i)=> i !== id);
    this._decks.next(res);
    localStorage.setItem(this.DECKS_IN_STORAGE,JSON.stringify(res));
  }
  addAllCards(){
    let allCards: MyCard[] = [];
    this.items$.getValue().forEach(c=>{
      allCards.push({
        id: c.id as number,
        count: 3
      });
    })
    this._myCardsList$.next(allCards);
    localStorage.setItem(this.MY_CARDS_IN_STORAGE,JSON.stringify(this._myCardsList$.getValue()));
  }
  
  typeMonster(card: CardYugioh):boolean{
    return card.Type !== 'Magic' && card.Type !== 'Field' && card.Type !== 'Equip' && card.Type !== 'Trap' && card.Type !== 'Ritual';
  }
  typeMagic(card: CardYugioh):boolean{
    return card.Type === 'Magic' || card.Type === 'Field' || card.Type === 'Equip';
  }
  typeTrap(card: CardYugioh):boolean{
    return card.Type === 'Trap';
  }
  typeRitual(card: CardYugioh):boolean{
    return card.Type === 'Ritual';
  }
}
