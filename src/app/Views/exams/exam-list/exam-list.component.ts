import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../shared/services/exam.service';
import { ExamViewModel } from '../../../shared/models/ExamViewModel ';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.css',
})
export class ExamListComponent implements OnInit {
  exams: ExamViewModel[] = [];
  permissions: string[] = [];
  constructor(
    private _examService: ExamService,
    private _authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.permissions = this._authService.getPermissions();
    this._examService.getExams().subscribe({
      next: (res) => {
        console.log(res.data);
        this.exams = res.data;
      },
      error: (err) => console.log(Error(err)),
    });
  }

  deleteExam(examId: number) {
    this._examService.deleteExam(examId).subscribe({
      next: (res) => {
        console.log(res);
        this.showSuccess();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showSuccess() {
    Swal.fire({
      title: 'Success!',
      text: `Exam Deleted Successfully`,
      icon: 'success',
      confirmButtonText: 'Cool',
    });
  }

  hasPermission(p: string): boolean {
    return this.permissions.includes(p);
  }
}
