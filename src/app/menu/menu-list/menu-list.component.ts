import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Drink } from '../../core/models/drink.interface';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

export class menuListComponent implements OnInit{

  constructor(private router: Router) {
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

  add() {
    this.menu.push({ drink_name: 'Fanta', drink_size: '1 L', drink_price: 4000 });
    //this.router.navigate(['add']);
    this.router.navigateByUrl('menu/add');
  }
  /**
  getUrlData() {
    this.menusService.getmenus().subscribe(data => {
      this.menus = data;
    });
  } */
}
