import { LoginComponent } from './features/auth/pages/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./core/layout/main/main.component').then((c) => c.MainComponent),
        children: [
            { path: '', redirectTo: '/employee', pathMatch: 'full' },
            {
                path: 'employee',
                loadChildren: () =>
                    import('./features/employee/employee.routes').then((c) => c.EmployeeRoutes),
            },
        ],
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((c) => c.AuthRoutes),
    },
    { path: '**', component: LoginComponent },
];
