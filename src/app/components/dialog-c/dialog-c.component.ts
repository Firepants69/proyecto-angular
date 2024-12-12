
import {Component, Inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
  

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog-c.component.html',
  styleUrl: './dialog-c.component.css'
})
export class DialogCComponent {
  userInput: string = "";
  constructor(
    public dialogRef: MatDialogRef<DialogCComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  guardar() {
    this.dialogRef.close(this.userInput);
  }
}
