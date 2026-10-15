import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../core/model/Classes/Employee.model';
import { EmployeeService } from '../../core/Services/employee-service';

@Component({
    imports: [MatIconModule, MatTableModule, MatButtonModule, CommonModule, RouterLink],
    selector: 'app-employee-list',
    styleUrl: './employee-list.scss',
    templateUrl: './employee-list.html',
})
export class EmployeeList {


    displayedColumns: string[] = [
        'employeeId',
        'employeeName',
        'contactNo',
        'emailId',
        'deptId',
        'gender',
        'role',
        'createdDate',
        'actions'
    ];

    employeeList$: Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>
    emplyeeService = inject(EmployeeService)

    constructor() {
        this.employeeList$ = this.emplyeeService.gteAllEmployees()
    }
    
    onDelete(employeeId: number): void {
        this.emplyeeService.deleteEmployee(employeeId).subscribe({
            next: (response) => {
                console.log('Employee deleted successfully', response);
            },
            error: (error) => {
                console.error('Delete failed:', error);
            }
        });
    }
}