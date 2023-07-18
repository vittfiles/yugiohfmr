import { Component, OnInit } from '@angular/core';
import { CardapiService } from './core/services/cardapi.service';
import { CardYugioh } from './core/models/card.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'yugiohfmr';
 /*  cards$: Observable<CardYugioh[]>; */

  constructor(private cardApiService: CardapiService){
    /* this.cards$ = this.cardApiService.getItems(); */
    //document.documentElement.style.setProperty('--theme-l-d', 'light');
  }

  ngOnInit(): void {
    this.cardApiService.fetchList();
  }
}
