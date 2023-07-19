import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Character } from 'src/app/core/models/card.interface';
import { CardapiService } from 'src/app/core/services/cardapi.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {
  notifier = new Subject();
  characters$: Observable<Character[]>;
  constructor(public cardApiService: CardapiService){
    this.characters$ = this.cardApiService.getCharacters().pipe(takeUntil(this.notifier));
  }

  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }
}
