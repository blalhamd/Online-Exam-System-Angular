import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamType, ExamViewModel } from '../../../shared/models/ExamViewModel ';
import { ExamService } from '../../../shared/services/exam.service';
import { UserAnswerDto } from '../../../shared/models/UserAnswerDto.model';
import { ExamAttemptService } from '../../../shared/services/exam-attempt.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScoreViewModel } from '../../../shared/models/Score.model';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-exam-template',
  templateUrl: './exam-template.component.html',
  styleUrl: './exam-template.component.css',
})
export class ExamTemplateComponent implements OnInit {
  exam!: any;
  examForm!: FormGroup;
  examAttemptId!: number;
  permissions: string[] = [];
  get answers(): FormArray {
    return this.examForm.get('answers') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private examAttemptService: ExamAttemptService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.permissions = this.authService.getPermissions();
    const examId = +this.route.snapshot.paramMap.get('id')!;

    this.examAttemptService.startExam(examId).subscribe({
      next: (res) => {
        (this.examAttemptId = res),
          console.log(`this.examAttemptId: ${this.examAttemptId}`);
      },
      error: (err) => console.error(err),
    });

    this.examService.getExamById(examId).subscribe({
      next: (exam) => {
        this.exam = exam;
        this.buildForm();
      },
      error: (err) => console.error(err),
    });
  }

  buildForm(): void {
    const controls = this.exam.chooseQuestions.map((q: any) =>
      this.fb.group({
        questionId: [q.id, Validators.required],
        selectedIndex: [null], // value from 0 to 3
      })
    );

    this.examForm = this.fb.group({
      answers: this.fb.array(controls),
    });
  }

  submitExam(): void {
    const rawAnswers = this.examForm.value.answers;

    const finalAnswers: UserAnswerDto[] = rawAnswers.map(
      (answer: any, index: number) => {
        const question = this.exam.chooseQuestions[index];
        // const choiceId =
        //   answer.selectedIndex !== null
        //     ? question.choices[answer.selectedIndex].id
        //     : null;
        const choiceId =
          answer.selectedIndex !== null ? answer.selectedIndex : null;
        return {
          questionId: answer.questionId,
          selectedChoiceId: choiceId,
        };
      }
    );
    console.log(finalAnswers);

    this.examAttemptService
      .submitExam(this.examAttemptId, finalAnswers)
      .subscribe({
        next: (res: ScoreViewModel) => {
          console.log(`res: ${res}`);
          this.router.navigate(['/user/examAttempts/score'], {
            state: { scoreResult: res },
          });
        },
        error: (err) => console.error('Submission error', err),
      });
  }

  cancel(): void {
    this.router.navigate(['/user/examAttempts/available-exams']);
  }

  hasPermissions(p: string): boolean {
    return this.permissions.includes(p);
  }
}
