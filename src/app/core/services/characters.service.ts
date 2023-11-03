import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardCharacterShow, CardYugioh, Character } from '../models/card.interface';
import { CardapiService } from './cardapi.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  
  CHARACTERS_URL = 'assets/characters.json';
  
  private cardsValues: CardYugioh[] = [];
  private _characters$: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
  private _currentCharacterBase$: BehaviorSubject<CardCharacterShow[]> = new BehaviorSubject<CardCharacterShow[]>([]);
  private _currentCharacter$: BehaviorSubject<CardCharacterShow[]> = new BehaviorSubject<CardCharacterShow[]>([]);

  constructor(private httpClient: HttpClient, private cardapiService: CardapiService) { }

  fetchList(){
    this.httpClient.get<Character[]>(this.CHARACTERS_URL).subscribe(receivedCharacters=> this._characters$.next(receivedCharacters));
    this.cardapiService.getItemsDraw().subscribe(x=>{
      this.cardsValues = x;
    });
  }

  getCharacters(): Observable<Character[]> {
    return this._characters$.asObservable();
  }
  
  getCurrentCharacter(position: number): Observable<CardCharacterShow[]>{
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
        card: this.cardsValues.find(e => e.id === c.id) || this.cardsValues[0]
      });
    });
    this._currentCharacter$.next(data);
    this._currentCharacterBase$.next(data);
    return this._currentCharacter$.asObservable();
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
}
