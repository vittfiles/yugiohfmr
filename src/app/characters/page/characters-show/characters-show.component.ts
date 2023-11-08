import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CardCharacterShow, CardYugioh } from 'src/app/core/models/card.interface';
import { CharactersService } from 'src/app/core/services/characters.service';
import { DialogCardComponent } from 'src/app/shared/dialog-card/dialog-card.component';

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

  constructor(public route: ActivatedRoute, public charactersService: CharactersService, public dialog: MatDialog){
    this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
      if(!Number.isNaN(params['id']))
      this.deckId = Number.parseInt(params['id']);
    });
    this.cardCharacter$ = charactersService.getCurrentCharacter(this.deckId);
    this.updateFilter();
  }
  cardClick(c: CardYugioh){
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data: c,
    });
    console.log(c.id);
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
      this.charactersService.filterCharacterCards({order: this.orderObject, ascending: this.ascending.value ? 1 : -1, search: this.search});
    }else{
      this.charactersService.filterCharacterCards({
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
  //code to render cards
  trackByItems(index: number,item: CardCharacterShow){
    return item.id;
  }
  
  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }
}
