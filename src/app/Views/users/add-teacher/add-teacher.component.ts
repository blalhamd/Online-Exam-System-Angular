import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectViewModel } from '../../../shared/models/SubjectViewModel';
import { SubjectService } from '../../../shared/services/subject.service';
import { CreateTeacherDto } from '../../../shared/models/CreateTeacherModel';
import { TeacherService } from '../../../shared/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css',
})
export class AddTeacherComponent implements OnInit {
  addTeacherForm!: FormGroup;
  subjects: SubjectViewModel[] = []; // List of available subjects
  isSubmitting = false;

  get fullName() {
    return this.addTeacherForm.get('fullName');
  }

  get email() {
    return this.addTeacherForm.get('email');
  }

  get password() {
    return this.addTeacherForm.get('password');
  }

  get phoneNumber() {
    return this.addTeacherForm.get('phoneNumber');
  }

  get hireDate() {
    return this.addTeacherForm.get('hireDate');
  }
  constructor(
    private fb: FormBuilder,
    private _userService: TeacherService,
    private _subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadSubjects(); // Fetch subjects from the backend
  }

  // Create the form
  createForm(): void {
    this.addTeacherForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
      subjects: this.fb.array([]), // FormArray to hold dynamic subjects
    });
  }

  // Getter for subjects (FormArray)
  get subjectsArray(): FormArray {
    return this.addTeacherForm.get('subjects') as FormArray;
  }

  // Add a new subject to the list
  addSubject(): void {
    const subjectGroup = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.subjectsArray.push(subjectGroup);
  }

  // Remove a subject from the list
  removeSubject(index: number): void {
    this.subjectsArray.removeAt(index);
  }

  // Load subjects from the backend (this can be fetched from a backend API)
  loadSubjects(): void {
    this._subjectService.getSubjects().subscribe(
      // Assign the fetched subjects to the subjects list
      {
        next: (response) => {
          this.subjects = response.data;
        },
        error: (err) => {
          console.error(err);
        },
      }
    );
  }

  // Submit the form data
  onSubmit(): void {
    if (this.addTeacherForm.valid) {
      this.isSubmitting = true;
      const teacherData: CreateTeacherDto = this.addTeacherForm.value;
      console.log(`teacherData: ${this.addTeacherForm.value}`);
      this._userService.createTeacher(teacherData).subscribe({
        next: (response) => {
          this.showSuccess(this.fullName?.value);
          this.isSubmitting = false;
          this.addTeacherForm.reset();
        },
        error: (error) => {
          console.error('Error adding teacher', error);
          this.isSubmitting = false;
        },
      });
    }
  }

  // Cancel the form and reset
  onCancel(): void {
    this.addTeacherForm.reset();
  }

  showSuccess(name: any) {
    Swal.fire({
      title: 'Success!',
      text: `Teacher ${name} Added Successfully.`,
      icon: 'success',
      confirmButtonText: 'Cool',
    });
  }
}
