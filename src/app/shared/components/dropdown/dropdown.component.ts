import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ValidationService } from '../../services/validation.service';

@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule],
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
    @Input() label!: string;
    @Input() fieldName!: string;
    @Input() optionLabel!: string;
    @Input() optionValue!: string;
    @Input() formGroup!: FormGroup;

    @Input() options!: any[];

    constructor(private validation: ValidationService) {}

    get isInvalid() {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.isInvalid(control);
    }

    get errorMessage(): string {
        const control = this.formGroup.get(this.fieldName) as FormControl;
        return this.validation.getErrorMessage(control);
    }

    get classFilled(): { [key: string]: boolean } {
        const isFilled = this.formGroup.get(this.fieldName)?.value !== '';
        return { 'p-filled': isFilled };
    }

    get classLabel() {
        return {
            'label-valid': !this.isInvalid,
            'label-invalid': this.isInvalid,
        };
    }
}
