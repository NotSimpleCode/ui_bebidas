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
    this.getUrlData();
    // this.getStaticData(); // Uncomment this line to use static data instead of API data
  }


  getStaticData() {
    this.menu = [
      { name: 'Coca Cola', size: '1 L', price: 4500 },
      { name: 'Pepsi', size: '500 ml', price: 2500 },
      { name: 'Sprite', size: '1.5 L', price: 5000 }
    ];
  }

  openAddModal() {
    const dialogRef = this.dialog.open(menuAddComponent, {
      width: '400px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((newDrink: Drink | null) => {
      if (newDrink) {
        console.log('New drink added:', newDrink);
        this.menu.push(newDrink)
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
