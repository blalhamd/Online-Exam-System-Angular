import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../shared/services/exam.service';
import { examModel, examType } from '../../../shared/models/examModel';
import { SubjectViewModel } from '../../../shared/models/SubjectViewModel';
import { SubjectService } from '../../../shared/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrl: './exam-create.component.css',
})
export class ExamCreateComponent implements OnInit {
  examForm!: FormGroup;
  subjects: SubjectViewModel[] = [];
  examType = examType; // Enum for ExamType

  get chooseQuestions(): FormArray {
    return this.examForm.get('chooseQuestions') as FormArray;
  }

  getChoicesArray(questionGroup: AbstractControl): FormArray {
    return questionGroup.get('choices') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private _subjectService: SubjectService,
    private _examService: ExamService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadSubjects();
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

  addQuestion(): void {
    const questionGroup = this._fb.group({
      title: ['', Validators.required],
      gradeOfQuestion: [0, [Validators.required, Validators.min(1)]],
      choices: this._fb.array([
        this.createChoice(),
        this.createChoice(),
        this.createChoice(),
        this.createChoice(),
      ]),
      correctAnswerIndex: [null, Validators.required],
    });
    this.chooseQuestions.push(questionGroup);
  }

  createChoice(): FormGroup {
    return this._fb.group({
      text: ['', Validators.required],
    });
  }

  removeQuestion(index: number): void {
    this.chooseQuestions.removeAt(index);
  }

  loadSubjects(): void {
    this._subjectService.getSubjects().subscribe({
      next: (res) => {
        console.log(res);
        this.subjects = res.data || [];
      },
      error: (err) => console.log(err),
    });
  }

  onSubmit(): void {
    if (this.examForm.valid) {
      const examData: examModel = this.examForm.value;
      this.examForm.value.subjectId = parseInt(this.examForm.value.subjectId);
      console.log(this.examForm.value);
      this._examService.createExam(examData).subscribe({
        next: (res) => {
          this.showSuccess();
          this.examForm.reset();
        },
        error: (err) => {
          console.error('Error adding exam', err);
        },
      });
    }
  }

  cancel(): void {
    this.examForm.reset();
  }

  showSuccess() {
    Swal.fire({
      title: 'Success!',
      text: `Exam Created Successfully.`,
      icon: 'success',
      confirmButtonText: 'Cool',
    });
  }
}
