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
        'gender',
        'role',
        'createdDate',
        'actions'
    ];

    // dataSource = [
    //     {
    //         employeeId: 4542,
    //         employeeName: 'Poojaa',
    //         contactNo: '999933333333',
    //         emailId: 'abc124@gmail.com',
    //         gender: 'Female',
    //         role: 'Employee',
    //         createdDate: '2026-09-18'
    //     },
    //     {
    //         employeeId: 4543,
    //         employeeName: 'Ravi Kumar',
    //         contactNo: '9876543210',
    //         emailId: 'ravi@gmail.com',
    //         gender: 'Male',
    //         role: 'Manager',
    //         createdDate: '2026-09-19'
    //     }
    // ];


    employeeList$ :Observable<EmployeeModel[]>=new Observable<EmployeeModel[]>
    emplyeeService=inject(EmployeeService)

    constructor(){
        this.employeeList$= this.emplyeeService.gteAllEmployees()
    }
}