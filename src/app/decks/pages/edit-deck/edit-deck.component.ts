import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { CardFilter, CardYugioh, Deck, MyCard } from 'src/app/core/models/card.interface';
import { CardapiService } from 'src/app/core/services/cardapi.service';
import { DialogCardComponent } from 'src/app/shared/dialog-card/dialog-card.component';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.scss']
})
export class EditDeckComponent implements OnDestroy {
  notifier = new Subject();
  deckId: number = 0;
  getDecks$: Observable<Deck[]>;
  deck?: Deck;
  //my cards data
  cardsDraw$: Observable<CardYugioh[]>;
 
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
  addCard: boolean = false;

  //deck cards
  currentDeck$: Observable<CardYugioh[]>;

  orderObjectCurrentDeck: string = 'id';
  searchCurrentDeck: string = "";
  filterInputCurrentDeck = new FormGroup({
    monsters : new FormControl(false),
    magics : new FormControl(false),
    traps : new FormControl(false),
    rituals : new FormControl(false)
  });
  ascendingCurrentDeck = new FormControl(true);
  removeCard: boolean = false;
  
  constructor(public route: ActivatedRoute, public cardApiService: CardapiService, public dialog: MatDialog){
    this.cardsDraw$ = this.cardApiService.getItemsDraw();
    this.currentDeck$ = this.cardApiService.getCurrentDeck();
    this.myCards$ = this.cardApiService.getMyCards().pipe(takeUntil(this.notifier));
    this.myCardList$ = this.cardApiService.getMyCardsList().pipe(takeUntil(this.notifier));

    this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
      if(!Number.isNaN(params['id']))
      this.deckId = Number.parseInt(params['id']);
    });
    this.getDecks$ = cardApiService.getDecks().pipe(takeUntil(this.notifier));
    this.getDecks$.forEach(decks=>this.deck = decks[this.deckId]);
  }
  ngOnInit(): void {
    this.cardApiService.setCurrentDeck(this.deckId);
    this.updateFilterCurrentDeck();
    for( let i = 0; i< 722; i++){
      this.listMyCards.push({
        id: i+1,
        position: i+1,
        hide: true,
        count: 0,
        use: this.cardApiService.getTotalOfCurrentDeck(i+1),
        showUse: true
      });
    }
    this.updateMyCardList();
  }
  updateMyCardList(){
    this.myCardList$.forEach(cards=>{
      cards.forEach(card=>{
        this.listMyCards[card.id-1].hide = false;
        this.listMyCards[card.id-1].count = card.count;
        this.listMyCards[card.id-1].use = this.cardApiService.getTotalOfCurrentDeck(card.id);
        /* this.list[card.id-1].count = card.count; */
      })
      console.log(cards);
    })
  }
  addCardToggle(event:any){ this.addCard = event.selected; }
  removeCardToggle(event:any){ this.removeCard = event.selected; }
  cardClickMyCards(id: number){
    if(this.addCard){
      console.log("agregar "+id);
      this.cardApiService.addCardToDeck(this.deckId,id+1);

      this.listMyCards.forEach(c=>{
        c.hide = true;
        c.count = 0;
      });
      /* this.list.forEach(c=>c.count = 0); */
      this.updateMyCardList();
      this.updateFilterCurrentDeck();
    }else{
      let data;
      this.cardsDraw$.forEach(cards=>{
        data = cards[id];
      })
      const dialogRef = this.dialog.open(DialogCardComponent, {
        data: data,
      });
      console.log(id);
    }
  }
  cardClickCurrentDeck(id: number|null|string){
    if(this.removeCard){
      console.log("quitar "+id);
      this.cardApiService.removeCardToDeck(this.deckId,id as number);

      this.listMyCards.forEach(c=>{
        c.hide = true;
        c.count = 0;
      });
      //this.list.forEach(c=>c.count = 0);
      this.updateMyCardList();
      this.updateFilterCurrentDeck();
    }else{
      let data;
      this.cardsDraw$.forEach(cards=>{
        data = cards[(id as number)-1];
      })
      const dialogRef = this.dialog.open(DialogCardComponent, {
        data: data,
      });
      console.log(id);
    }
  }
  orderUpdateMyCards(event: any,type: string){
    if(event.selected){
      this.orderObjectMyCards = type;
    }else{
      this.orderObjectMyCards = 'id';
    }
    this.updateFilterMyCards();
  }
  orderUpdateCurrentDeck(event: any,type: string){
    if(event.selected){
      this.orderObjectCurrentDeck = type;
    }else{
      this.orderObjectCurrentDeck = 'id';
    }
    this.updateFilterCurrentDeck();
  }
  updateFilterCurrentDeck(){
    if(!this.filterInputCurrentDeck.controls.monsters.value && !this.filterInputCurrentDeck.controls.magics.value && !this.filterInputCurrentDeck.controls.traps.value && !this.filterInputCurrentDeck.controls.rituals.value){
      this.cardApiService.filterCards({order: this.orderObjectCurrentDeck,currentDeck:true, ascending: this.ascendingCurrentDeck.value ? 1 : -1, search: this.searchCurrentDeck});
    }else{
      this.cardApiService.filterCards({
        filters: {
          monsters: this.filterInputCurrentDeck.controls.monsters.value,
          magics: this.filterInputCurrentDeck.controls.magics.value,
          traps: this.filterInputCurrentDeck.controls.traps.value,
          rituals: this.filterInputCurrentDeck.controls.rituals.value
        },
        currentDeck: true,
        order : this.orderObjectCurrentDeck,
        ascending: this.ascendingCurrentDeck.value ? 1 : -1,
        search: this.searchCurrentDeck
      });
    }
    /* this.listMyCards.forEach(e=>e.hide=true)
    this.myCards$.forEach(cards=>{
      cards.forEach((card, i)=>{
        let id = card.id as number;
        this.listMyCards[id-1].hide = false;
        this.listMyCards[id-1].position = i+1;
      })
    }) */
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
