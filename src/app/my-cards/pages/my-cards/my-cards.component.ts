import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CardapiService } from 'src/app/core/services/cardapi.service';
import { CardFilter, CardYugioh, MyCard } from 'src/app/core/models/card.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCardComponent } from 'src/app/shared/dialog-card/dialog-card.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.scss']
})
export class MyCardsComponent implements OnInit, OnDestroy{
  notifier = new Subject();
  title = 'yugiohfmr';
  cardsDraw$: Observable<CardYugioh[]>;
  cards$: Observable<CardYugioh[]>;
  list: CardFilter[] = [];

  primary: string= 'primary';

  orderObject: string = 'id';
  search: string = "";
  filterInput = new FormGroup({
    monsters : new FormControl(false),
    magics : new FormControl(false),
    traps : new FormControl(false),
    rituals : new FormControl(false)
  });
  ascending = new FormControl(true);
  addCard: boolean = false;

  //my cards
  myCards$: Observable<CardYugioh[]>;
  myCardList$: Observable<MyCard[]>;
  listMyCards: CardFilter[] = [];

  orderObjectMyCards: string = 'id';
  searchMyCards: string = "";
  filterInputMyCards = new FormGroup({
    monsters : new FormControl(false),
    magics : new FormControl(false),
    traps : new FormControl(false),
    rituals : new FormControl(false)
  });
  ascendingMyCards = new FormControl(true);
  removeCard: boolean = false;
  
  constructor(public cardApiService: CardapiService,public dialog: MatDialog){
    this.cardsDraw$ = this.cardApiService.getItemsDraw();
    this.cards$ = this.cardApiService.getItems().pipe(takeUntil(this.notifier));
    this.myCards$ = this.cardApiService.getMyCards().pipe(takeUntil(this.notifier));
    this.myCardList$ = this.cardApiService.getMyCardsList().pipe(takeUntil(this.notifier));
  }

  ngOnInit(): void {
    for( let i = 0; i< 722; i++){
      this.list.push({
        id: i+1,
        position: i+1,
        hide: false,
        count: 0
      });
      this.listMyCards.push({
        id: i+1,
        position: i+1,
        hide: true,
        count: 0
      });
    }
    this.updateMyCardList();
  }
  updateMyCardList(){
    this.myCardList$.forEach(cards=>{
      cards.forEach(card=>{
        this.listMyCards[card.id-1].hide = false;
        this.listMyCards[card.id-1].count = card.count;
        this.list[card.id-1].count = card.count;
      })
    })
  }

  addCardToggle(event:any){ this.addCard = event.selected; }
  removeCardToggle(event:any){ this.removeCard = event.selected; }
  cardClick(id: number){
    if(this.addCard){
      console.log("agregar "+id);
      this.cardApiService.addCardMyCardList(id+1);
      this.updateMyCardList();
    }else{
      console.log(id);
      let data;
      this.cardsDraw$.forEach(cards=>{
        data = cards[id];
      })
      const dialogRef = this.dialog.open(DialogCardComponent, {
        data: data,
      });
    }
  }
  cardClickMyCards(id: number){
    if(this.removeCard){
      console.log("quitar "+id);
      this.cardApiService.removeCardMyCardList(id+1);

      this.listMyCards.forEach(c=>{
        c.hide = true;
        c.count = 0;
      });
      this.list.forEach(c=>c.count = 0);
      this.updateMyCardList();
      this.updateFilterMyCards()
    }else{
      console.log(id);
      let data;
      this.cardsDraw$.forEach(cards=>{
        data = cards[id];
      })
      const dialogRef = this.dialog.open(DialogCardComponent, {
        data: data,
      });
    }
  }

  orderUpdate(event: any,type: string){
    /* console.log(event);
    console.log(type); */
    if(event.selected){
      this.orderObject = type;
    }else{
      this.orderObject = 'id';
    }
    this.updateFilter();
  }
  orderUpdateMyCards(event: any,type: string){
    /* console.log(event);
    console.log(type); */
    if(event.selected){
      this.orderObjectMyCards = type;
    }else{
      this.orderObjectMyCards = 'id';
    }
    this.updateFilterMyCards();
  }
  updateFilter(){
    if(!this.filterInput.controls.monsters.value && !this.filterInput.controls.magics.value && !this.filterInput.controls.traps.value && !this.filterInput.controls.rituals.value){
      this.cardApiService.filterCards({order: this.orderObject,ascending: this.ascending.value ? 1 : -1, search: this.search});
    }else{
      this.cardApiService.filterCards({
        filters: {
          monsters: this.filterInput.controls.monsters.value,
          magics: this.filterInput.controls.magics.value,
          traps: this.filterInput.controls.traps.value,
          rituals: this.filterInput.controls.rituals.value
        },
        order : this.orderObject,
        ascending: this.ascending.value ? 1 : -1,
        search: this.search
      });
    }
    this.list.forEach(e=>e.hide=true)
    this.cards$.forEach(cards=>{
      cards.forEach((card, i)=>{
        let id = card.id as number;
        this.list[id-1].hide = false;
        this.list[id-1].position = i+1;
      })
    })
  }
  updateFilterMyCards(){
    if(!this.filterInputMyCards.controls.monsters.value && !this.filterInputMyCards.controls.magics.value && !this.filterInputMyCards.controls.traps.value && !this.filterInputMyCards.controls.rituals.value){
      this.cardApiService.filterCards({order: this.orderObjectMyCards,myCards:true, ascending: this.ascendingMyCards.value ? 1 : -1, search: this.searchMyCards});
    }else{
      this.cardApiService.filterCards({
        filters: {
          monsters: this.filterInputMyCards.controls.monsters.value,
          magics: this.filterInputMyCards.controls.magics.value,
          traps: this.filterInputMyCards.controls.traps.value,
          rituals: this.filterInputMyCards.controls.rituals.value
        },
        myCards: true,
        order : this.orderObjectMyCards,
        ascending: this.ascendingMyCards.value ? 1 : -1,
        search: this.searchMyCards
      });
    }
    this.listMyCards.forEach(e=>e.hide=true)
    this.myCards$.forEach(cards=>{
      cards.forEach((card, i)=>{
        let id = card.id as number;
        this.listMyCards[id-1].hide = false;
        this.listMyCards[id-1].position = i+1;
      })
    })
  }
  filter(){
    //this.cardApiService.filterCards();
  }
  addAllCards(){
    this.cardApiService.addAllCards();
    this.updateMyCardList();
  }
  //scroll controller
  scrollPosition: number = 0;
  getScroll(e: any){
    this.scrollPosition = e.target.scrollTop;
  }

  scrollPositionSecond: number = 0;
  getScrollSecond(e: any){
    this.scrollPositionSecond = e.target.scrollTop;
  }

  changeTab(e: MatTabChangeEvent){
    document.querySelector('.scrollCards')?.scrollTo(0,this.scrollPosition);
    document.querySelector('.scrollCardsSecond')?.scrollTo(0,this.scrollPositionSecond);
  }
  
  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }
}
