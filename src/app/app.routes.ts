import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'menu',
        loadChildren: () => import('./menu/menu.routes').then(m => m.MENU_ROUTES)
    }
];