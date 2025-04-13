import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { menusService } from '../../core/services/menus.service';
//import { menu } from '../../core/models/menu.interface';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
//import { FilterPipe } from '../../pipes/filter-by-pipe';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

export class menuListComponent {
  properties!: string;
  filterProperty = '';

  //menus: menu[] = []; 

  totalConv = 0;
  convAbiertas = 0;

  /**
  constructor(private menusService: menusService) { }

  ngOnInit(): void {
    this.menusService.getmenus().subscribe(data => {
      this.menus = data;

      // Calculate stats after data is received
      this.totalConv = this.menus.length;
      this.convAbiertas = this.menus.filter(conv => new Date(conv.menu_deadline_date) > new Date()).length;
      this.menusService.setFilteredData(this.menus);
    });
  } */

}
