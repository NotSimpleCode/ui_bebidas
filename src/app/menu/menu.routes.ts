import { Routes } from "@angular/router";
import { menuListComponent } from "./convocation-list/menu-list.component";

export const MENU_ROUTES: Routes = [    
    { path: '', component:  menuListComponent},
    { path: 'add', component:  menuListComponent}
];