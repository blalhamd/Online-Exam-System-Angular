import { Component } from '@angular/core';
import { ExamType, ExamViewModel } from '../../../shared/models/ExamViewModel ';
import { ExamService } from '../../../shared/services/exam.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css',
})
export class ExamDetailsComponent {
  exam: ExamViewModel = {
    id: 0,
    subjectId: 0,
    subjectName: '',
    totalGrade: 0,
    level: 0,
    duration: '',
    examType: ExamType.Quiz,
    description: '',
    status: false,
    chooseQuestions: [],
  };
  constructor(
    private _examService: ExamService,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (id) {
        this._examService.getExamById(id).subscribe((exam) => {
          this.exam = exam;
        });
      } else {
        console.error('Invalid exam ID');
      }
    });
  }
}
