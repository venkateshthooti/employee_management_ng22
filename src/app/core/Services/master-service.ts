import { HttpClient } from '@angular/common/http';
import { inject, Inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { GlobalConstant } from '../globalConstant/Global.Constant';
import { DashboardData, IApiResponseModel } from '../model/Interfaces/user.model';

@Service()
export class MasterService {

    http=inject(HttpClient)

    getAllParentDept():Observable<IApiResponseModel>{
        return this.http.get<IApiResponseModel>(environment.API_URL+"GetParentDepartment")
    }

    getAllChildDeptByParentId():Observable<IApiResponseModel>{
        return this.http.get<IApiResponseModel>(environment.API_URL+"GetChildDepartmentByParentId?deptId="+1    )
    }

    getDashboard(): Observable<DashboardData> {
        return this.http.get<DashboardData>(
            environment.API_URL + GlobalConstant.API_Method.GET_DASHBOARD
        );
    }
   
}
