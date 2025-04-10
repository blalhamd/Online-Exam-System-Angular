import { createChooseQuestionDto } from './../models/examModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { examModel } from '../models/examModel';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private _http: HttpClient) {}

  getExams(pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    // Create HttpParams to append the query parameters
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this._http.get(`${environment.baseUrl}/api/Exams`, {
      params,
    });
  }

  getExamById(examId: number): Observable<any> {
    return this._http.get(`${environment.baseUrl}/api/Exams/${examId}`);
  }

  assignStudentsToExam(examId: number, studentIds: number[]): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}/api/Exams/${examId}/assign-students`,
      studentIds
    );
  }

  createExam(examModel: examModel): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/Exams`, examModel);
  }

  editExam(examId: number, examModel: examModel): Observable<any> {
    return this._http.put(
      `${environment.baseUrl}/api/Exams/${examId}`,
      examModel
    );
  }

  deleteExam(examId: number): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/api/Exams/${examId}`);
  }

  addChooseQuestionToExam(examId: number, model: createChooseQuestionDto) {
    return this._http.post(
      `${environment.baseUrl}/api/Exams/${examId}/questions/mcq`,
      model
    );
  }

  editChooseQuestionToExam(
    examId: number,
    questionId: number,
    model: createChooseQuestionDto
  ) {
    return this._http.post(
      `${environment.baseUrl}/api/Exams/${examId}/questions/mcq/${questionId}`,
      model
    );
  }

  deleteChooseQuestionToExam(examId: number, questionId: number) {
    return this._http.delete(
      `${environment.baseUrl}/api/Exams/${examId}/questions/mcq/${questionId}`
    );
  }
}
