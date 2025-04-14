import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Drink } from '../../core/models/drink.interface';
import { drinkService } from '../../core/services/drink.service';

@Component({
  selector: 'app-menu-add',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [drinkService],
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})
export class menuAddComponent {

  constructor(private router: Router, private drinkService: drinkService) {}

  onSubmit(drinkForm: NgForm) {
    if (drinkForm.valid) {
      const newDrink: Drink = drinkForm.value;
      this.drinkService.createDrink(newDrink).subscribe({
        next: () => {
          this.router.navigate(['/menu']);
        },
        error: (err: any) => {
          alert('Error adding drink: ' + err.message);
          console.error('Error adding drink:', err);
        }
      });
    }
  }
}
