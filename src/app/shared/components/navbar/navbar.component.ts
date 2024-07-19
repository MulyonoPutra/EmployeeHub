import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { take, timer } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, MenuModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    storageService: StorageService = inject(StorageService);
    router: Router = inject(Router);

    logout(): void {
        this.storageService.clear();
        timer(2000)
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl('auth/login'));
    }
}
