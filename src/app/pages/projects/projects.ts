import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectService } from '../../core/Services/project-service';
import { IProject, NewProjectModel } from '../../core/model/Interfaces/user.model';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { EmployeeModel } from '../../core/model/Classes/Employee.model';
import { EmployeeService } from '../../core/Services/employee-service';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectEmployeeModel } from '../../core/model/Interfaces/user.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {

  projectForm!: FormGroup;
  projectService = inject(ProjectService)
  projectList = signal<IProject[]>([])
  showProjectForm = signal(false);

  empSer = inject(EmployeeService)
  empList = signal<EmployeeModel[]>([]);

  @ViewChild('addEmployeeDialogTemplate') addEmployeeDialogTemplate!: TemplateRef<unknown>;
  employeeForm!: FormGroup;
  selectedEmployee = signal<EmployeeModel | null>(null);
  selectedProject: IProject | null = null;

  projectEmployeeList = signal<ProjectEmployeeModel[]>([]);
  currentSelectedProjectEmps = signal<ProjectEmployeeModel[]>([]);


  currentProjectId: number = 0;



  constructor(private fb: FormBuilder, private dialog: MatDialog) {

    this.initializeForm()
    this.empSer.gteAllEmployees().subscribe({
      next: (employees: EmployeeModel[]) => {
        this.empList.set(employees)
      }
      // error: () => this.assignmentError.set('Unable to load employees.')
    });
    this.initializeEmpForm()

  }

  ngOnInit(): void {
    this.loadProject()
    this.loadProjectEmployee()
  }

  get f() {
    return this.projectForm.controls;
  }

  initializeForm() {

    this.projectForm = new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      clientName: new FormControl(""),
      startDate: new FormControl(""),
      leadByEmpId: new FormControl(0),
      contactPerson: new FormControl(""),
      contactNo: new FormControl(""),
      emailId: new FormControl(""),
    })

  }
  initializeEmpForm() {
    this.employeeForm = this.fb.group({
      empProjectId: [0],
      projectId: [0, Validators.required],
      empId: [0, [Validators.required, Validators.min(2)]],
      assignedDate: [new Date().toISOString(), Validators.required],
      role: ['', Validators.required],
      isActive: [false]
    });
  }


  loadProject() {
    // debugger
    this.projectService.getAllProjects().subscribe({
      next: (response: IProject[]) => {
        this.projectList.set(response)
      }
    })
  }
  loadProjectEmployee() {

    this.projectService.getAllProjectEmployee().subscribe({
      next: (response: ProjectEmployeeModel[]) => {


        this.projectEmployeeList.set(response)
        this.updateSelectedProjectEmployees()
      },
      // error: () => {
      //   if (loadId === this.projectEmployeeLoadId) {
      //     this.assignmentError.set('Unable to load project assignments.')
      //   }
      // }
    })
  }

  onAddProject(): void {
    // this.projectForm.reset({
    //   projectId: 0,
    //   projectName: '',
    //   clientName: '',
    //   startDate: '',
    //   leadByEmpId: 0,
    //   contactPerson: '',
    //   contactNo: '',
    //   emailId: ''
    // });

    this.showProjectForm.set(true);
  }

  onCancel(): void {
    this.showProjectForm.set(false);
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    } else {
      const formValue: NewProjectModel = this.projectForm.value;
      this.projectService.createProject(formValue).subscribe({
        next: (response: NewProjectModel) => {
          alert("project creation successful")
          this.loadProject()
          this.showProjectForm.set(false);
        }
      })
    }

    console.log('Project Form Data:', this.projectForm.value);
  }


  openAddEmployeeDialog(project: IProject) {
    this.currentProjectId = project.projectId
    this.selectedProject = project;


    this.employeeForm.reset({
      empProjectId: 0,
      projectId: project.projectId,
      empId: 0,
      assignedDate: this.getLocalDateTime(),
      role: '',
      isActive: false
    });

    this.updateSelectedProjectEmployees();

    this.dialog.open(this.addEmployeeDialogTemplate, {
      width: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true
    });
  }

  selectEmployee(employeeId: number): void {
    const selectEmployeeObj = this.empList().find(item => item.employeeId === employeeId) ?? null;
    this.selectedEmployee.set(selectEmployeeObj);
  }

  removeEmployee(assignment: ProjectEmployeeModel): void {
    const employee = this.empList().find(item => item.employeeId === assignment.empId) ?? null;

    this.employeeForm.patchValue({ empId: assignment.empId });
  }

  addEmployeeToProject() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload: ProjectEmployeeModel = this.employeeForm.value;

    this.projectService.createProjectEmployee(payload).subscribe({
      next: (response: any) => {

        alert('employe added to the project successfull')
        this.loadProjectEmployee()
      },
      error: () => {
        // this.assignmentError.set('Unable to add this employee to the project. Please try again.');
      }
    })

  }

  private updateSelectedProjectEmployees(): void {
    this.currentSelectedProjectEmps.set(
      this.projectEmployeeList().filter(item => item.projectId === this.currentProjectId)
    );
  }

  private getLocalDateTime(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }

}
