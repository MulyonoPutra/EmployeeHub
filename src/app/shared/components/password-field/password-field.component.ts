import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ValidationService } from '../../services/validation.service';

@Component({
    selector: 'app-password-field',
    standalone: true,
    imports: [CommonModule, PasswordModule, FormsModule, ReactiveFormsModule, FloatLabelModule],
    templateUrl: './password-field.component.html',
    styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent {
    @Input() label!: string;
    @Input() fieldName!: string;
    @Input() formGroup!: FormGroup;
    @Input() isDisabled!: FormGroup;

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
