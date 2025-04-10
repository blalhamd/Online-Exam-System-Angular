import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamAttemptRoutingModule } from './exam-attempt-routing.module';
import { AvailableExamsComponent } from './available-exams/available-exams.component';
import { ScoreComponent } from './score/score.component';
import { ExamTemplateComponent } from './exam-template/exam-template.component';


@NgModule({
  declarations: [
    AvailableExamsComponent,
    ScoreComponent,
    ExamTemplateComponent
  ],
  imports: [
    CommonModule,
    ExamAttemptRoutingModule
  ]
})
export class ExamAttemptModule { }
