import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
    },
];
