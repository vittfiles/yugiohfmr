import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Character } from 'src/app/core/models/card.interface';
import { CharactersService } from 'src/app/core/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {
  notifier = new Subject();
  characters$: Observable<Character[]>;
  constructor(public charactersService: CharactersService){
    this.characters$ = this.charactersService.getCharacters().pipe(takeUntil(this.notifier));
  }

  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }
}
