import { Routes } from '@angular/router';

export const EmployeeRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/employee-list/employee-list.component').then(
                (c) => c.EmployeeListComponent,
            ),
    },
    {
        path: 'details/:id',
        loadComponent: () =>
            import('./pages/employee-details/employee-details.component').then(
                (c) => c.EmployeeDetailsComponent,
            ),
    },
    {
        path: 'update/:id',
        loadComponent: () =>
            import('./pages/employee-form/employee-form.component').then(
                (c) => c.EmployeeFormComponent,
            ),
    },
    {
        path: 'create',
        loadComponent: () =>
            import('./pages/employee-form/employee-form.component').then(
                (c) => c.EmployeeFormComponent,
            ),
    },
];
