import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    private currentRoute!: string;
    private fullWidthRoutes: string[] = ['/employee'];

    constructor(private readonly router: Router) {
        this.trackRouteChanges();
    }

    trackRouteChanges(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.urlAfterRedirects;
            }
        });
    }

    get isFullWidthRoute(): boolean {
        return this.fullWidthRoutes.includes(this.currentRoute);
    }
}
