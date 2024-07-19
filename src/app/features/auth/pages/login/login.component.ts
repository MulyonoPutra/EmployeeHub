import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { TextFieldComponent } from '../../../../shared/components/text-field/text-field.component';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { timer, take } from 'rxjs';
import { PasswordFieldComponent } from '../../../../shared/components/password-field/password-field.component';
import { StorageService } from '../../../../shared/services/storage.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TextFieldComponent,
        PasswordFieldComponent,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    get formCtrlValue() {
        return {
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value,
        };
    }

    navigateAfterSucceed(): void {
        timer(2000)
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl('/'));
    }

    onSubmit(): void {
        if (this.form.valid) {
          this.storageService.setCredentials(this.formCtrlValue.email)
            this.router.navigateByUrl('/');
        }
    }
}
