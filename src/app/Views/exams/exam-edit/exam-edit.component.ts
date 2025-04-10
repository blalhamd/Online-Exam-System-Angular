import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ExamService } from '../../../shared/services/exam.service';
import { SubjectService } from '../../../shared/services/subject.service';
import { examModel, examType } from '../../../shared/models/examModel';
import { SubjectViewModel } from '../../../shared/models/SubjectViewModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrl: './exam-edit.component.css',
})
export class ExamEditComponent implements OnInit {
  examForm!: FormGroup;
  subjects: SubjectViewModel[] = [];
  examType = examType;
  examId!: number;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _examService: ExamService,
    private _subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.examId = +this._route.snapshot.paramMap.get('id')!;
    console.log(`ExamId ${this.examId}`);
    this.createForm();
    this.loadSubjects();
    this.loadExam();
  }

  createForm(): void {
    this.examForm = this._fb.group({
      subjectId: [null, Validators.required],
      totalGrade: [null, [Validators.required, Validators.min(1)]],
      level: [null, Validators.required],
      duration: ['', Validators.required],
      examType: [examType.Quiz, Validators.required],
      description: ['', Validators.required],
      status: [false],
      chooseQuestions: this._fb.array([]),
    });
  }

  get chooseQuestions(): FormArray {
    return this.examForm.get('chooseQuestions') as FormArray;
  }

  getChoicesArray(questionGroup: AbstractControl): FormArray {
    return questionGroup.get('choices') as FormArray;
  }

  createChoice(text = ''): FormGroup {
    return this._fb.group({
      text: [text, Validators.required],
    });
  }

  createQuestion(questionData?: any): FormGroup {
    return this._fb.group({
      title: [questionData?.title || '', Validators.required],
      gradeOfQuestion: [
        questionData?.gradeOfQuestion || 1,
        [Validators.required, Validators.min(1)],
      ],
      choices: this._fb.array(
        questionData?.choices?.map((c: any) => this.createChoice(c.text)) || [
          this.createChoice(),
          this.createChoice(),
          this.createChoice(),
          this.createChoice(),
        ]
      ),
      correctAnswerIndex: [
        questionData?.correctAnswerIndex ?? null,
        Validators.required,
      ],
    });
  }

  addQuestion(): void {
    this.chooseQuestions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    this.chooseQuestions.removeAt(index);
  }

  loadSubjects(): void {
    this._subjectService.getSubjects().subscribe({
      next: (res) => (this.subjects = res.data || []),
      error: (err) => console.error(err),
    });
  }

  loadExam(): void {
    this._examService.getExamById(this.examId).subscribe({
      next: (exam: examModel) => {
        this.examForm.patchValue({
          subjectId: exam.subjectId,
          totalGrade: exam.totalGrade,
          level: exam.level,
          duration: exam.duration,
          examType: exam.examType,
          description: exam.description,
          status: exam.status,
        });

        exam.chooseQuestions.forEach((question) => {
          this.chooseQuestions.push(this.createQuestion(question));
        });
      },
      error: (err) => console.error('Error loading exam', err),
    });
  }

  onSubmit(): void {
    if (this.examForm.valid) {
      console.log(this.examForm.value);
      console.log(this.examForm.value.subjectId);
      this.examForm.value.subjectId = parseInt(this.examForm.value.subjectId);
      console.log(this.examForm.value.subjectId);
      const updatedExam: examModel = this.examForm.value;
      this._examService.editExam(this.examId, updatedExam).subscribe({
        next: () => {
          this.showSuccess();
          this._router.navigate(['/admin/exams/list', this.examId]); // back to details
        },
        error: (err) => console.error('Error updating exam', err),
      });
    }
  }

  cancel(): void {
    this._router.navigate(['/admin/exams/list', this.examId]);
  }

  showSuccess() {
    Swal.fire({
      title: 'Success!',
      text: `Exam Updated Successfully.`,
      icon: 'success',
      confirmButtonText: 'Cool',
    });
  }
}
