export class EmployeeModel {
    employeeId: number
    employeeName: string
    contactNo: string
    emailId: string
    deptId: number
    password: string
    gender: string
    role: string
    createdDate: string;

    constructor() {
        this.contactNo = '';
        this.createdDate = new Date().toISOString();
        this.deptId=0
        this.emailId=''
        this.employeeId=0;
        this.employeeName='';
        this.gender='';
        this.password=''
        this.role=''

    }
}
