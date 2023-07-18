import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardYugioh } from 'src/app/core/models/card.interface';
import { CardapiService } from 'src/app/core/services/cardapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  title = 'yugiohfmr';
  cards$: Observable<CardYugioh[]>;

  constructor(private cardApiService: CardapiService){
    this.cards$ = this.cardApiService.getItems();
  }

  ngOnInit(): void {
  }
}
