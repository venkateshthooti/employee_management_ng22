export interface User {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  createdDate: string;
}
export interface IApiResponseModel {

  message: string,
  result: boolean,
  data: any
}

export interface IParentDept {
  departmentId: number,
  departmentName: string,
  departmentLogo: string
}

export interface IChildDept {

  childDeptId: number,
  parentDeptId: number,
  departmentName: string

}

export interface NewProjectModel {
  projectId: number
  projectName: string
  clientName: string
  startDate: string
  leadByEmpId: number
  contactPerson: string
  contactNo: string
  emailId: string
}

export interface IProject extends NewProjectModel{

  employeeName: string
}

export interface ProjectEmployeeModel {
  empProjectId: number
  projectId: number
  empId: number
  assignedDate: string
  role: string
  isActive: boolean
  employeeName?: string
}

export interface DashboardEmployee {
  employeeId: number
  employeeName: string
  contactNo: string
  emailId: string
  deptId: number
  role: string
  createdDate: string
}

export interface DashboardData {
  totalEmployee: number
  totalProject: number
  recentEmployee: DashboardEmployee[]
  recentProjects: NewProjectModel[]
}