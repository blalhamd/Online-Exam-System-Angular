import { Component, OnInit } from '@angular/core';
import { TeacherViewModel } from '../../../shared/models/TeacherViewModel';
import { Router } from '@angular/router';
import { TeacherService } from '../../../shared/services/teacher.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css',
})
export class TeacherListComponent implements OnInit {
  teachers: TeacherViewModel[] = []; // To store the list of teachers
  permissions: string[] = [];
  constructor(
    private _userService: TeacherService,
    private _router: Router,
    private _authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.permissions = this._authService.getPermissions();
    this.loadTeachers(); // Load the list of teachers when the component initializes
  }

  // Fetch the list of teachers from the backend
  loadTeachers(): void {
    this._userService.getTeachers().subscribe({
      next: (res) => {
        console.log(`res: ${res}`);
        this.teachers = res.data; // Store the list of teachers in the component
      },
      error: (err) => {
        console.error('Error fetching teachers', err); // Handle errors
      },
    });
  }

  hasPermissions(p: string): boolean {
    return this.permissions.includes(p);
  }
}
