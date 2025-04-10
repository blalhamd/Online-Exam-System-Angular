import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CreateTeacherDto } from '../models/CreateTeacherModel';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private _http: HttpClient) {}

  getTeachers(pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this._http.get(`${environment.baseUrl}/api/Teachers`, { params });
  }

  createTeacher(model: CreateTeacherDto): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/Teachers`, model);
  }
}
