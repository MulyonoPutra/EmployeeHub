import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, MenuModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {}
