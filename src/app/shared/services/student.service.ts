import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CreateStudentDto } from '../models/CreateStudentModel';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}

  getStudents(pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this._http.get(`${environment.baseUrl}/api/Students`, { params });
  }

  createStudent(model: CreateStudentDto): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/Students`, model);
  }
}
