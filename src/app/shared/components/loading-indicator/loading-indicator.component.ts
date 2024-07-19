import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading-indicator',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent {
    @Input() loadingIndicator!: boolean;
}
