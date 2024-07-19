import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ValidationService } from '../../services/validation.service';

@Component({
    selector: 'app-calendar-field',
    standalone: true,
    imports: [CommonModule, CalendarModule, FloatLabelModule, FormsModule, ReactiveFormsModule],
    templateUrl: './calendar-field.component.html',
    styleUrls: ['./calendar-field.component.scss'],
})
export class CalendarFieldComponent {
    date: Date | undefined;
    @Input() label!: string;
    @Input() fieldName!: string;
    @Input() formGroup!: FormGroup;
    @Input() isDisabled!: FormGroup;

    disabledDates: Date[] = [];

    today = new Date();
    tomorrow = new Date(this.today);

    constructor(private validation: ValidationService) {
        this.tomorrow.setDate(this.today.getDate() + 1);
    }

    get isInvalid() {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.isInvalid(control);
    }

    get errorMessage(): string {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.getErrorMessage(control);
    }

    get classLabel() {
        return {
            'label-valid': !this.isInvalid,
            'label-invalid': this.isInvalid,
        };
    }

    get classFilled(): { [key: string]: boolean } {
        const isFilled = this.formGroup.get(this.fieldName)?.value !== '';
        return { 'p-filled': isFilled };
    }

    isNextDay(date: Date): boolean {
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1); // Get next day
        return (
            date.getDate() === nextDay.getDate() &&
            date.getMonth() === nextDay.getMonth() &&
            date.getFullYear() === nextDay.getFullYear()
        );
    }
}
