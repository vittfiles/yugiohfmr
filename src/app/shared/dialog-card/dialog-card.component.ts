import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CardYugioh } from 'src/app/core/models/card.interface';

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.scss']
})
export class DialogCardComponent {
  src: string = "";
  constructor(
    public dialogRef: MatDialogRef<DialogCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CardYugioh,
  ) {
    this.src = data.src?.replace('imgCard','imgFullCard') as string;
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
