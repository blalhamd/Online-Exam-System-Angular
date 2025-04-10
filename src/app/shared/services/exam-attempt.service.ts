import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserAnswerDto } from '../models/UserAnswerDto.model';

@Injectable({
  providedIn: 'root',
})
export class ExamAttemptService {
  constructor(private _http: HttpClient) {}

  startExam(examId: number): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}/api/ExamAttempts/${examId}/start-exam`,
      {}
    );
  }

  submitExam(examAttemptId: number, answers: UserAnswerDto[]): Observable<any> {
    return this._http.put(
      `${environment.baseUrl}/api/ExamAttempts/${examAttemptId}`,
      answers
    );
  }
}
