import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Drink } from '../../core/models/drink.interface';
import { drinkService } from '../../core/services/drink.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [drinkService],
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})

export class menuAddComponent {
  constructor(
    private dialogRef: MatDialogRef<menuAddComponent>,
    private drinkService: drinkService
  ) {}

  onSubmit(drinkForm: NgForm) {
    if (drinkForm.valid) {
      const newDrink: Drink = drinkForm.value;
      this.drinkService.createDrinkMock(newDrink).subscribe({
        next: () => {
          alert('Drink added successfully!');
          this.dialogRef.close(newDrink); // Cierra el modal y devuelve el nuevo drink
        },
        error: (err: any) => {
          alert('Error adding drink: ' + err.message);
          console.error('Error adding drink:', err);
        }
      });
    } else{
      alert('Please fill in all fields correctly.');
    } 
  }

}
