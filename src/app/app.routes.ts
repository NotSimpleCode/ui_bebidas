import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./menu/menu.routes').then(m => m.MENU_ROUTES)
    }
];