import { Routes } from "@angular/router";
import { MenuListComponent } from "./menu-list/menu-list.component";
import { MenuAddComponent } from "./add/menu.add.component";

export const MENU_ROUTES: Routes = [    
    { path: '', component:  MenuListComponent}
    ,{ path: 'add', component:  MenuAddComponent}
];