import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { StudentListComponent } from './student-list/student-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { checkPermissionGuard } from '../../shared/guards/check-permission.guard';

const routes: Routes = [
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.Users.ViewStudents'] },
  },
  {
    path: 'teachers',
    component: TeacherListComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.Users.ViewTeachers'] },
  },
  {
    path: 'students/add',
    component: AddStudentComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.Users.AddStudent'] },
  },
  {
    path: 'teachers/add',
    component: AddTeacherComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.Users.AddTeacher'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
