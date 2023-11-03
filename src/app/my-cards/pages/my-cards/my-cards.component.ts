import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
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
export class MyCardsComponent implements OnInit, AfterViewChecked, OnDestroy{
  notifier = new Subject();
  
  cards$: Observable<CardYugioh[]>;
  list: CardFilter[] = [];
  limit: number = 30;
  total: number = 730;

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
  limitMyCard: number = 30;
  totalMyCard: number = 730;
  firstUpdateMyCard: boolean = true;

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
        this.listMyCards[card.id-1].count = card.count;
        this.list[card.id-1].count = card.count;
      })
    })
  }

  addCardToggle(event:any){ this.addCard = event.selected; }
  removeCardToggle(event:any){ this.removeCard = event.selected; }
  cardClick(c: CardYugioh){
    if(this.addCard){
      console.log("agregar "+c.id);
      this.cardApiService.addCardMyCardList(c.idInt);
      this.updateMyCardList();
      this.updateFilterMyCards();
    }else{
      const dialogRef = this.dialog.open(DialogCardComponent, {
        data: c,
      });
    }
  }
  cardClickMyCards(c: CardYugioh){
    if(this.removeCard){
      console.log("quitar "+c.id);
      this.cardApiService.removeCardMyCardList(c.idInt);
      this.listMyCards.forEach(c=>c.count = 0);
      this.list.forEach(c=>c.count = 0);
      this.updateMyCardList();
      this.updateFilterMyCards();
    }else{
      const dialogRef = this.dialog.open(DialogCardComponent, {
        data: c,
      });
    }
  }

  orderUpdate(event: any,type: string){
    if(event.selected){
      this.orderObject = type;
    }else{
      this.orderObject = 'id';
    }
    this.updateFilter();
  }
  orderUpdateMyCards(event: any,type: string){
    if(event.selected){
      this.orderObjectMyCards = type;
    }else{
      this.orderObjectMyCards = 'id';
    }
    this.updateFilterMyCards();
  }
  updateFilter(){
    this.limit = 30;
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
  }
  updateFilterMyCards(){
    this.limitMyCard = 30;
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
  }
  addAllCards(){
    this.cardApiService.addAllCards();
    this.updateMyCardList();
    this.updateFilterMyCards();
  }
  removeAllCards(){
    this.cardApiService.removeAllCards();
    this.listMyCards.forEach(c=>c.count = 0);
    this.list.forEach(c=>c.count = 0);
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

  //code to render cards
  trackByItems(index: number,item: CardYugioh){
    return item.id;
  }
  ngAfterViewChecked() {
    // viewChild is updated after the view has been checked
    //console.log('AfterViewChecked (no change)');
    if(this.limit < this.total){
      setTimeout(()=>{
        if(this.limit < this.total)
          this.limit += 150;
        /* console.log(this.limit); */
      },50);
    }
    if(this.limitMyCard < this.totalMyCard){
      setTimeout(()=>{
        if(this.limitMyCard < this.totalMyCard)
          this.limitMyCard += 150;
        if(this.firstUpdateMyCard){
          this.firstUpdateMyCard=false;
          this.updateFilterMyCards();
        }
        /* console.log(this.limitMyCard); */
      },50);
    }
  }
  
  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }
}
