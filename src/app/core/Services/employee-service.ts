
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EmployeeModel } from '../model/Classes/Employee.model';
import { Observable } from 'rxjs';
import { GlobalConstant } from '../globalConstant/Global.Constant';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private httpClient = inject(HttpClient);

    gteAllEmployees(): Observable<EmployeeModel[]> {
        return this.httpClient.get<EmployeeModel[]>(
            environment.API_URL + GlobalConstant.API_Method.GET_ALL_EMPLOYEES
        );
    }

    onCreateEmployee(payload: EmployeeModel) {
        return this.httpClient.post<EmployeeModel>(
            environment.API_URL + GlobalConstant.API_Method.CREATE_EMPLOYEE,
            payload
        );
    }
    onGetEmployeeById(empid: number): Observable<EmployeeModel> {
        return this.httpClient.get<EmployeeModel>(environment.API_URL + 'GetEmployee/' + empid)
    }
    onUpdateEmployee(id: number, empObj: EmployeeModel): Observable<any> {
        return this.httpClient.put<any>(environment.API_URL + 'UpdateEmployee/' + id, empObj);
    }

    deleteEmployee(employeeId: number) {
        return this.httpClient.delete(
            `${environment.API_URL}DeleteEmployee/${employeeId}`
        );
    }
}