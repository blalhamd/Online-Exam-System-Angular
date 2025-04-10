import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private _http: HttpClient) {}

  getSubjects(pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    // Create HttpParams to append the query parameters
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this._http.get(`${environment.baseUrl}/api/Subjects`, { params });
  }
}
