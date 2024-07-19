import { CommonModule, Location } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';
import { EmployeeEntity } from '../../../../core/domain/entities/employee-entity';
import { RupiahFormatPipe } from '../../../../shared/pipes/rupiah-format.pipe';
import { ToastService } from '../../../../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-employee-details',
    standalone: true,
    imports: [CommonModule, RupiahFormatPipe],
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.scss'],
    providers: [EmployeeService],
})
export class EmployeeDetailsComponent implements OnInit {
    routeId!: number;
    label!: string;
    employee!: EmployeeEntity;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly location: Location,
        private readonly employeeService: EmployeeService,
        private readonly destroyRef: DestroyRef,
        private readonly toastService: ToastService,
    ) {
        this.routeId = +this.route.snapshot.paramMap.get('id')!;
    }

    ngOnInit(): void {
        this.findEmployeeById();
    }

    findEmployeeById(): void {
        this.employeeService.getEmployeeById(this.routeId)
          .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
            next: (data) => {
                this.employee = data;
            },
          error: (error: HttpErrorResponse) => {
            this.toastService.showErrorToast('Error', error.message);
          },
          complete: () => { },
        });
    }

    goBack(): void {
        this.location.back();
    }
}
