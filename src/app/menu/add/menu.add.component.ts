import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Drink } from '../../core/models/drink.interface';
import { DrinkService } from '../../core/services/drink.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DrinkService],
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})

export class MenuAddComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<MenuAddComponent>,
    private readonly DrinkService: DrinkService
  ) {}

  onSubmit(drinkForm: NgForm) {
    if (drinkForm.valid) {
      const newDrink: Drink = drinkForm.value;
      this.DrinkService.createDrink(newDrink).subscribe({
        next: () => {
          alert('Drink added successfully!');
          console.log('New drink added Final');
          this.dialogRef.close(newDrink);
        },
        error: (err: any) => {
          alert('Error adding drink');
          console.error('Error adding drink:', err);
          this.dialogRef.close(null);
        }
      });
    } else {
      alert('Please fill in all fields correctly.');
      
    }
  }

}
