import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { email, form, FormField, min, required, FormRoot } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeModel } from '../../core/model/Classes/Employee.model';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../core/Services/employee-service';
import { MasterService } from '../../core/Services/master-service';
import { IApiResponseModel, IChildDept, IParentDept } from '../../core/model/Interfaces/user.model';

@Component({
    selector: 'app-employee-form',
    standalone: true,

    imports: [
        FormField,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        FormRoot
    ],

    templateUrl: './employee-form.html',
    styleUrl: './employee-form.scss'
})
export class EmployeeForm implements OnInit {

    private router = inject(Router);
    activatedRoute = inject(ActivatedRoute)

    employeeModel = signal(new EmployeeModel());
    childDetails: WritableSignal<IChildDept[]> = signal([]);

    employeeForm = form(this.employeeModel, (schema) => {

        required(schema.employeeName);
        required(schema.contactNo);
        required(schema.emailId);
        required(schema.deptId);
        min(schema.deptId, 1);
        required(schema.password);
        required(schema.gender);
        required(schema.role);
        email(schema.emailId);
    });

    isSubmitting = signal(false);
    formError = signal('');
    formSuccess = signal('');

    masterService = inject(MasterService)
    constructor(private employeeService: EmployeeService) {

    }
    currentEmpId: number = 0
    ngOnInit(): void {

        this.getParentDept()

        this.activatedRoute.params.subscribe({
            next: (Response: any) => {
                // debugger
                this.currentEmpId = Response.id
            }
        })

        if (this.currentEmpId != 0) {
            this.getEmployeeById()
        }

       


    }

    parentDetails: WritableSignal<IParentDept[]> = signal([])

    getParentDept() {
        this.masterService.getAllParentDept().subscribe({
            next: (response: IApiResponseModel) => {
                if (!response.result) {
                    this.formError.set(response.message || 'Unable to load departments.');
                    return;
                }
                // this.parentDetails.set(response.data ?? [{departmentId:1,departmentName:'choose department',departmentLogo:''}]);
                const departments = response.data;

                this.parentDetails.set(
                    departments && departments.length > 0
                        ? departments
                        : [
                            {
                                departmentId: 1,
                                departmentName: 'Choose department',
                                departmentLogo: ''
                            }
                        ]
                );
            },
            error: (error: Error) => {
                this.formError.set(error.message || 'Unable to load departments.');
            },
        })
    }

    getEmployeeById(): void {
        this.employeeService.onGetEmployeeById(this.currentEmpId).subscribe({
            next: (response: EmployeeModel) => {
                const employee = response;

                this.employeeModel.set({
                    ...new EmployeeModel(),
                    ...employee,
                    gender: employee.gender?.trim()
                        ? employee.gender.trim().charAt(0).toUpperCase() +
                        employee.gender.trim().slice(1).toLowerCase()
                        : ''
                });
                console.log('API gender:', employee.gender);
                console.log('Model gender:', this.employeeModel().gender);
                console.log('Form gender:', this.employeeForm.gender().value());
            },

            error: (error) => {
                console.error('Failed to get employee details', error);
            }
        });


    }
   
    onChangeParent(event: MatSelectChange) {
        const id = event.value;
        this.childDetails.set([]);
        this.employeeForm.deptId().value.set(0);
        this.formError.set('');

        if (id == null) {
            return;
        }

        this.masterService.getAllChildDeptByParentId().subscribe({
            next: (response: IApiResponseModel) => {
                if (!response.result) {
                    this.formError.set(response.message || 'Unable to load child departments.');
                    return;
                }
                this.childDetails.set(response.data ?? []);
            },
            error: (error: Error) => {
                this.formError.set(error.message || 'Unable to load child departments.');
            },
        })
    }

    onSubmit(event: Event): void {
        // event.preventDefault();
        this.formError.set('');
        this.formSuccess.set('');

        if (this.employeeForm().invalid() || this.isSubmitting()) {
            return;
        }

        this.isSubmitting.set(true);

        if (this.currentEmpId == 0) {
            const payload = this.employeeForm().value();

            this.employeeService.onCreateEmployee(payload).subscribe({
                next: (response: EmployeeModel) => {

                    this.formSuccess.set('Employee created successfully.');
                    alert(this.formSuccess())
                    this.isSubmitting.set(false);
                },
                error: (error: HttpErrorResponse) => {
                    const apiMessage = typeof error.error === 'object' && error.error !== null
                        ? error.error.message
                        : undefined;
                    const message = apiMessage || (
                        error.status
                            ? `The server could not create the employee (HTTP ${error.status}). Please try again or contact support.`
                            : 'Unable to reach the server. Check your connection and try again.'
                    );
                    this.formError.set(message);
                    this.isSubmitting.set(false);
                },
            });
        }
        else{
            this.employeeService.onUpdateEmployee(this.currentEmpId,this.employeeForm().value()).subscribe({
                next:(response:any)=>{
                    alert("updated successfully")
                    this.router.navigateByUrl("/admin/empoyee-list")
                },error:(err:any)=>{
                    alert("Failed updation")
                }
            })
        }

    }

    goBack() {
        this.router.navigate(['/admin/empoyee-list']);
    }
}