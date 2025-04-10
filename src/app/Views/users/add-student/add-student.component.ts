import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../shared/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css',
})
export class AddStudentComponent {
  createStudentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  // Create the form
  createForm(): void {
    this.createStudentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ], // Example for 10-digit phone number
    });
  }

  // Getter for form controls (for easy access in the template)
  get fullName() {
    return this.createStudentForm.get('fullName');
  }
  get email() {
    return this.createStudentForm.get('email');
  }
  get password() {
    return this.createStudentForm.get('password');
  }
  get phoneNumber() {
    return this.createStudentForm.get('phoneNumber');
  }

  // Submit form data
  onSubmit(): void {
    if (this.createStudentForm.valid) {
      const studentData = this.createStudentForm.value;
      this.studentService.createStudent(studentData).subscribe({
        next: (response) => {
          this.showSuccess(this.fullName?.value);
          this.createStudentForm.reset(); // Reset form after successful submission
        },
        error: (error) => {
          console.error('Error creating student:', error);
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }

  // Reset form
  onReset(): void {
    this.createStudentForm.reset();
  }

  showSuccess(name: any) {
    Swal.fire({
      title: 'Success!',
      text: `Student ${name} Added Successfully.`,
      icon: 'success',
      confirmButtonText: 'Cool',
    });
  }
}
