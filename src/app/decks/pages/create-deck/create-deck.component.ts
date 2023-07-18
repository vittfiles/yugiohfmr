import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CardapiService } from 'src/app/core/services/cardapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.scss']
})
export class CreateDeckComponent {
  formCreateDeck = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    description: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(50)])
  });

  constructor(public cardapiService: CardapiService, private router: Router){}

  submit(){
    if(this.formCreateDeck.valid){
      console.log(this.formCreateDeck.controls.name.value);
      console.log(this.formCreateDeck.controls.description.value);
      this.cardapiService.createDeck(this.formCreateDeck.controls.name.value as string,this.formCreateDeck.controls.description.value as string);
      this.router.navigate(['/decks'])
    }
  }
}
