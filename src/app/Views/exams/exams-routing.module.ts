import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';
import { ExamCreateComponent } from './exam-create/exam-create.component';
import { checkPermissionGuard } from '../../shared/guards/check-permission.guard';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'list',
    component: ExamListComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.Exams.View'] },
  },
  {
    path: 'list/:id',
    component: ExamDetailsComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.Exams.ViewById'] },
  }, // View Exam by ID
  {
    path: 'list/edit/:id',
    component: ExamEditComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.Exams.Edit'] },
  }, // Edit Exam
  {
    path: 'add',
    component: ExamCreateComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.Exams.Create'] },
  }, // Add new Exam
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}
