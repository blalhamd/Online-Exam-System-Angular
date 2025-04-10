import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamsRoutingModule } from './exams-routing.module';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';
import { ExamCreateComponent } from './exam-create/exam-create.component';
import { ExamDetailsComponent } from './exam-details/exam-details.component';

@NgModule({
  declarations: [
    ExamListComponent,
    ExamEditComponent,
    ExamCreateComponent,
    ExamDetailsComponent,
  ],
  imports: [CommonModule, ExamsRoutingModule, ReactiveFormsModule],
})
export class ExamsModule {}
