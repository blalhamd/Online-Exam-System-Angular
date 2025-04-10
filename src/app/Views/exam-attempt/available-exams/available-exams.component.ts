import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../shared/services/exam.service';
import { ExamViewModel } from '../../../shared/models/ExamViewModel ';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-available-exams',
  templateUrl: './available-exams.component.html',
  styleUrl: './available-exams.component.css',
})
export class AvailableExamsComponent implements OnInit {
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

  hasPermission(per: string) {
    return this.permissions.includes(per);
  }
}
