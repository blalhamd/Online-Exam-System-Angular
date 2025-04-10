import { Component } from '@angular/core';
import { StudentViewModel } from '../../../shared/models/StudentViewModel';
import { Router } from '@angular/router';
import { StudentService } from '../../../shared/services/student.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  students: StudentViewModel[] = []; // To store the list of students
  permissions: string[] = [];
  constructor(
    private _userService: StudentService,
    private _router: Router,
    private _authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.permissions = this._authService.getPermissions();
    this.loadStudents(); // Load the list of students when the component initializes
  }

  // Fetch the list of students from the backend
  loadStudents(): void {
    this._userService.getStudents().subscribe({
      next: (res) => {
        console.log(res);
        this.students = res.data; // Store the list of students in the component
      },
      error: (err) => {
        console.error('Error fetching students', err); // Handle errors
      },
    });
  }

  hasPermissions(p: string): boolean {
    return this.permissions.includes(p);
  }
}
