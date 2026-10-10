
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

    gteAllEmployees():Observable<EmployeeModel[]>{
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
}