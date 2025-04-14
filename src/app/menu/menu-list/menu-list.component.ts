import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drink } from '../../core/models/drink.interface';
import { MatDialog } from '@angular/material/dialog';
import { menuAddComponent } from '../add/menu.add.component';
import { drinkService } from '../../core/services/drink.service';


@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

export class menuListComponent implements OnInit{

  constructor( private drinkService: drinkService, private dialog: MatDialog) {
  }

  menu: Drink[] = [];

  ngOnInit(): void {
    this.getStaticData();
  }


  getStaticData() {
    this.menu = [
      { drink_name: 'Coca Cola', drink_size: '1 L', drink_price: 4500 },
      { drink_name: 'Pepsi', drink_size: '500 ml', drink_price: 2500 },
      { drink_name: 'Sprite', drink_size: '1.5 L', drink_price: 5000 }
    ];
  }

  openAddModal() {
    const dialogRef = this.dialog.open(menuAddComponent, {
      width: '400px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((newDrink: Drink | null) => {
      if (newDrink) {
        this.menu.push(newDrink); // Actualiza la lista con el nuevo elemento
        console.log('New drink added:', newDrink);
      } else {
        console.log('Modal closed without adding a drink.');
      }
    });
  }

  getUrlData() {
    this.drinkService.getDrinks().subscribe(data => {
      this.menu = data;
    });
  } 
}
