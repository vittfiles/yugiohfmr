import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardYugioh, MyCard } from '../models/card.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { typeMonster, typeMagic, typeRitual, typeTrap } from '../utils/handle-type';
import { filterYugiohCards } from '../utils/filter-cards';

@Injectable({
  providedIn: 'root'
})
export class CardapiService {
  MY_CARDS_IN_STORAGE = 'my_cards_in_storage';
  ITEMS_URL = 'assets/cards2.json';

  private readonly items$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);
  private readonly _cards$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);
  private readonly _myCards$: BehaviorSubject<CardYugioh[]> = new BehaviorSubject<CardYugioh[]>([]);
  private readonly _myCardsList$: BehaviorSubject<MyCard[]> = new BehaviorSubject<MyCard[]>([]);
  
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
          card.idInt = card.id;
          card.src = "assets/imgCard/"+ card.id + "-data.png";
          card.monster = typeMonster(card);
          card.magic = typeMagic(card);
          card.trap = typeTrap(card);
          card.ritual = typeRitual(card);
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
    
    let myCardsInStorage = localStorage.getItem(this.MY_CARDS_IN_STORAGE);
    if(myCardsInStorage)
      this._myCardsList$.next(JSON.parse(myCardsInStorage));
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
    /* console.log(this._myCardsList$.getValue()); */
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
    /* console.log(this._myCardsList$.getValue()); */
  }

  filterCards(obj: any): void{
    /* console.log("inicio filtro") */
    let res = [...this.items$.getValue()];

    res = filterYugiohCards(obj,res);
    
    if(obj.myCards){
      res = res.filter(card => {
        if(this._myCardsList$.getValue().find(mycard=> mycard.id === card.id))return true;
        return false;
      });
      this._myCards$.next(res);
    }else{
      this._cards$.next(res);
    }
    /* console.log("termino filtro",res) */
  }
  removeAllCards(){
    this._myCards$.next([]);
    this._myCardsList$.next([]);
    localStorage.setItem(this.MY_CARDS_IN_STORAGE,JSON.stringify(this._myCardsList$.getValue()));
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
}
