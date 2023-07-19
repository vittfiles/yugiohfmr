import { Component, Input } from '@angular/core';
import { CardFilter, CardYugioh } from 'src/app/core/models/card.interface';

@Component({
  selector: 'app-card-show',
  templateUrl: './card-show.component.html',
  styleUrls: ['./card-show.component.scss']
})
export class CardShowComponent {
  @Input()
  card?: CardYugioh;
  @Input()
  listData?: CardFilter;
  @Input()
  chance100?: number;
  @Input()
  chanceShow?: boolean;
}
