import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CardCharacterShow } from 'src/app/core/models/card.interface';
import { CardapiService } from 'src/app/core/services/cardapi.service';

@Component({
  selector: 'app-characters-show',
  templateUrl: './characters-show.component.html',
  styleUrls: ['./characters-show.component.scss']
})
export class CharactersShowComponent {
  notifier = new Subject();
  deckId: number = 0;
  cardCharacter$: Observable<CardCharacterShow[]>;
  
  orderObject: string = '100';
  search: string = "";
  filterInput = new FormGroup({
    monsters : new FormControl(false),
    magics : new FormControl(false),
    traps : new FormControl(false),
    rituals : new FormControl(false)
  });
  ascending = new FormControl(false);

  constructor(public route: ActivatedRoute, public cardApiService: CardapiService, public dialog: MatDialog){
    this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
      if(!Number.isNaN(params['id']))
      this.deckId = Number.parseInt(params['id']);
    });
    this.cardCharacter$ = cardApiService.getCurrentCharacter(this.deckId);
    this.updateFilter();
  }
  orderUpdate(event: any,type: string){
    if(event.selected){
      this.orderObject = type;
    }else{
      this.orderObject = 'id';
    }
    this.updateFilter();
  }
  updateFilter(){
    if(!this.filterInput.controls.monsters.value && !this.filterInput.controls.magics.value && !this.filterInput.controls.traps.value && !this.filterInput.controls.rituals.value){
      this.cardApiService.filterCharacterCards({order: this.orderObject, ascending: this.ascending.value ? 1 : -1, search: this.search});
    }else{
      this.cardApiService.filterCharacterCards({
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
    /* this.listMyCards.forEach(e=>e.hide=true)
    this.myCards$.forEach(cards=>{
      cards.forEach((card, i)=>{
        let id = card.id as number;
        this.listMyCards[id-1].hide = false;
        this.listMyCards[id-1].position = i+1;
      })
    }) */
  }
  
  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }
}
