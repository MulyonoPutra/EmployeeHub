import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { EmployeeEntity } from '../domain/entities/employee-entity';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    private employeesUrl = '/api/employees';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {}

    getEmployees(): Observable<EmployeeEntity[]> {
        return this.http
            .get<EmployeeEntity[]>(this.employeesUrl)
            .pipe(catchError(this.handleError<EmployeeEntity[]>('getEmployees', [])));
    }

    getEmployeeById(id: number): Observable<EmployeeEntity> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http
            .get<EmployeeEntity>(url)
            .pipe(catchError(this.handleError<EmployeeEntity>(`getEmployee id=${id}`)));
    }

    updateEmployee(id: number, employee: EmployeeEntity): Observable<any> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http
            .put(url, employee, this.httpOptions)
            .pipe(catchError(this.handleError<any>('updateEmployee')));
    }

    addEmployee(employee: EmployeeEntity): Observable<EmployeeEntity> {
        return this.http
            .post<EmployeeEntity>(this.employeesUrl, employee, this.httpOptions)
            .pipe(catchError(this.handleError<EmployeeEntity>('addEmployee')));
    }

    deleteEmployee(id: number): Observable<unknown> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError<EmployeeEntity>('deleteEmployee')));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
