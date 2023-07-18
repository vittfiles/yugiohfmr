import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { CardFilter, CardYugioh, Deck, MyCard } from 'src/app/core/models/card.interface';
import { CardapiService } from 'src/app/core/services/cardapi.service';

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

  constructor(public route: ActivatedRoute, public cardApiService: CardapiService){
    this.cardsDraw$ = this.cardApiService.getItemsDraw();
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
    for( let i = 0; i< 722; i++){
      this.listMyCards.push({
        id: i+1,
        position: i+1,
        hide: false,
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
        /* this.list[card.id-1].count = card.count; */
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
