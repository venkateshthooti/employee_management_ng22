import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../globalConstant/Global.Constant';
import { Observable } from 'rxjs';
import { IProject, NewProjectModel, ProjectEmployeeModel } from '../model/Interfaces/user.model';

@Service()
export class ProjectService {

    httpClient = inject(HttpClient)

    getAllProjects(): Observable<IProject[]> {
        return this.httpClient.get<IProject[]>(environment.API_URL + GlobalConstant.API_Method.GET_ALL_PROJECTS)
    }

    createProject(obj: NewProjectModel): Observable<NewProjectModel> {
        return this.httpClient.post<NewProjectModel>(environment.API_URL + GlobalConstant.API_Method.CREATE_NEW_PROJECT, obj)
    }
    getAllProjectEmployee(): Observable<ProjectEmployeeModel[]> {
        return this.httpClient.get<ProjectEmployeeModel[]>(environment.API_URL + GlobalConstant.API_Method.GET_ALL_PROJECT_EMPLOYEE)
    }
    createProjectEmployee(payload: ProjectEmployeeModel): Observable<unknown> {
        return this.httpClient.post<unknown>(environment.API_URL + GlobalConstant.API_Method.CREATE_PROJECT_EMPLOYEE, payload)
    }

}
