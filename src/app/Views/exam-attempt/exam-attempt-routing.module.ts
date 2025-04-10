import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableExamsComponent } from './available-exams/available-exams.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamTemplateComponent } from './exam-template/exam-template.component';
import { ScoreComponent } from './score/score.component';
import { checkPermissionGuard } from '../../shared/guards/check-permission.guard';

const routes: Routes = [
  { path: '', redirectTo: 'available-exams', pathMatch: 'full' },
  {
    path: 'available-exams',
    component: AvailableExamsComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.Exams.View'] },
  },
  {
    path: 'template/:id',
    component: ExamTemplateComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.ExamAttempts.StartExam'] },
  },
  {
    path: 'score',
    component: ScoreComponent,
    canActivate: [checkPermissionGuard],
    data: { permissions: ['Permissions.ExamAttempts.SubmitExam'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
})
export class ExamAttemptRoutingModule {}
