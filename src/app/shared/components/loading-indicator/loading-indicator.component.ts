import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';

@Component({
    selector: 'app-loading-indicator',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent implements OnInit {
    @Input() loadingIndicator!: boolean;

    ngOnInit(): void {}
}
