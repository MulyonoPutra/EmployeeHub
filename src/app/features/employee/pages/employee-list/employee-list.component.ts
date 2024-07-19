import { CommonModule } from '@angular/common';
import { Component, DestroyRef, HostListener, ViewChild, type OnInit } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { EmployeeEntity } from '../../../../core/domain/entities/employee-entity';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        TagModule,
        IconFieldModule,
        InputTextModule,
        InputIconModule,
        MultiSelectModule,
        ButtonModule,
        TooltipModule,
    ],
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    providers: [EmployeeService],
})
export class EmployeeListComponent implements OnInit {
    @ViewChild('dt') dt!: Table;
    isVisible: boolean = false;
    employees: EmployeeEntity[] = [];

    columns = [
        { field: 'username', header: 'Username' },
        { field: 'email', header: 'Email' },
        { field: 'birthDate', header: 'Birth Date' },
        { field: 'status', header: 'Status' },
        { field: 'action', header: 'Action', sortable: false },
    ];

    constructor(
        private readonly router: Router,
        private readonly employeeService: EmployeeService,
        private readonly destroyRef: DestroyRef,
        private readonly toastService: ToastService,
    ) {}

    ngOnInit(): void {
        this.getEmployees();
      window.addEventListener('scroll', this.onWindowScroll);
    }

    getEmployees(): void {
        this.employeeService
            .getEmployees()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (data) => {
                    this.employees = data;
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {},
            });
    }

    onCreate(): void {
        this.router.navigateByUrl(`/employee/create`);
    }

    onView(id: number): void {
        this.router.navigateByUrl(`/employee/details/${id}`);
    }

    onRemove(id: number): void {
        this.employeeService
            .deleteEmployee(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Removed Successfully!');
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.getEmployees();
                },
            });
    }

    onUpdate(id: string): void {
        this.router.navigateByUrl(`/employee/update/${id}`);
    }

    filter(table: Table, event: Event) {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        table.filterGlobal(value, 'contains');
    }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 270,
      behavior: 'smooth',
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 20) {
      this.isVisible = true;
    } else if (scrolled <= 300) {
      this.isVisible = false;
    }
  }
}
