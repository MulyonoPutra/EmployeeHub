import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { take, timer } from 'rxjs';
import { EmployeeEntity } from '../../../../core/domain/entities/employee-entity';
import { EmployeeService } from '../../../../core/services/employee.service';
import { CalendarFieldComponent } from '../../../../shared/components/calendar-field/calendar-field.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { NumberFieldComponent } from '../../../../shared/components/number-field/number-field.component';
import { TextFieldComponent } from '../../../../shared/components/text-field/text-field.component';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [
        CommonModule,
        InputNumberModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownComponent,
        TextFieldComponent,
        NumberFieldComponent,
        CalendarFieldComponent,
    ],
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss'],
    providers: [EmployeeService],
})
export class EmployeeFormComponent implements OnInit {
    form!: FormGroup;
    routeId!: number;
    label!: string;

    group = [
        { id: 1, name: 'IT' },
        { id: 2, name: 'HR' },
        { id: 3, name: 'Finance' },
        { id: 4, name: 'Marketing' },
        { id: 5, name: 'Sales' },
        { id: 6, name: 'Engineering' },
        { id: 7, name: 'Customer Support' },
        { id: 8, name: 'Operations' },
        { id: 9, name: 'Legal' },
        { id: 10, name: 'Research & Development' },
    ];

    status = [
        { id: 1, name: 'Active' },
        { id: 2, name: 'Inactive' },
    ];

    constructor(
        private readonly fb: FormBuilder,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly employeeService: EmployeeService,
        private readonly location: Location,
        private readonly destroyRef: DestroyRef,
        private readonly toastService: ToastService,
    ) {
        this.routeId = +this.route.snapshot.paramMap.get('id')!;
    }

    ngOnInit(): void {
        this.formInitialized();
        this.initPageFromRouteId();
    }

    findEmployeeById(): void {
        this.employeeService
            .getEmployeeById(this.routeId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (data) => {
                    this.prepopulateForm(data);
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
            });
    }

    initPageFromRouteId(): void {
        this.label = this.routeId ? 'Update' : 'Create';
        if (this.routeId) {
            this.findEmployeeById();
        }
    }

    formInitialized(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            birthDate: ['', Validators.required],
            basicSalary: ['', Validators.required],
            status: ['', Validators.required],
            group: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    get formCtrlValue() {
        return {
            username: this.form.get('username')?.value,
            firstName: this.form.get('firstName')?.value,
            lastName: this.form.get('lastName')?.value,
            email: this.form.get('email')?.value,
            birthDate: this.form.get('birthDate')?.value,
            basicSalary: this.form.get('basicSalary')?.value,
            status: this.form.get('status')?.value.name,
            group: this.form.get('group')?.value.name,
            description: this.form.get('description')?.value,
        };
    }

    prepopulateForm(employee: EmployeeEntity): void {
        this.form.patchValue({
            username: employee.username,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            birthDate: new Date(employee.birthDate),
            basicSalary: employee.basicSalary,
            status: employee.status,
            group: employee.group,
            description: new Date(employee.description),
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.routeId ? this.onUpdate() : this.onCreate();
        }
    }

    onCreate(): void {
        this.employeeService
            .addEmployee(this.formCtrlValue)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Successfully!');
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed();
                },
            });
    }

    onUpdate(): void {
        this.employeeService
            .updateEmployee(this.routeId, this.formCtrlValue)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Updated Successfully!');
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed();
                },
            });
    }

    navigateAfterSucceed(): void {
        timer(3000)
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigateByUrl('/employee');
            });
    }

    goBack(): void {
        this.location.back();
    }
}
