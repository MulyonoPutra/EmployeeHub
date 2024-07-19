import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    markAllFormControlsAsTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach((control: AbstractControl) => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markAllFormControlsAsTouched(control);
            }
        });
    }

    isInvalid(control: FormControl): boolean {
        return control && control.touched && control.invalid && (control.dirty || control.touched);
    }

    getErrorMessage(control: FormControl): string {
        if (control.errors?.['required']) {
            return 'This field is required.';
        }
        if (control.errors?.['email']) {
            return 'Invalid email format.';
        }
        if (control.errors?.['minlength']) {
            const requiredLength = control.errors['minlength'].requiredLength;
            return `Password should be at least ${requiredLength} characters long.`;
        }
        if (control.errors?.['maxlength']) {
            const requiredLength = control.errors['maxlength'].requiredLength;
            return `This field at least maximum ${requiredLength} characters long.`;
        }
        if (control.errors?.['passwordMismatch']) {
            return 'Passwords do not match.';
        }
        if (control.errors?.['invalidPhoneNumber']) {
            return 'Invalid phone number format.';
        }

        // if (control.errors?.['invalidPassword']) {
        //   return 'Password must be at least 6 characters long, and include uppercase, lowercase, numbers, and special characters.';
        // }
        if (control.errors?.['hasLowerCase']) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (control.errors?.['hasUpperCase']) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (control.errors?.['hasNumeric']) {
            return 'Password must contain at least one number.';
        }
        if (control.errors?.['hasSpecialChar']) {
            return 'Password must contain at least one special character.';
        }
        if (control.errors?.['isValidLength']) {
            return 'Password must be at least 6 characters long.';
        }

        return '';
    }
}
