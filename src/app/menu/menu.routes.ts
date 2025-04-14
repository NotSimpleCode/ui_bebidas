import { Routes } from "@angular/router";
import { menuListComponent } from "./menu-list/menu-list.component";
import { menuAddComponent } from "./add/menu.add.component";

export const MENU_ROUTES: Routes = [    
    { path: '', component:  menuListComponent}
    ,{ path: 'add', component:  menuAddComponent}
];