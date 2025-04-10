import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';
import { UserLayoutComponent } from './shared/components/layouts/user-layout/user-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Views/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  { path: 'blank', component: BlankLayoutComponent, children: [] },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'exams',
        loadChildren: () =>
          import('./Views/exams/exams.module').then((m) => m.ExamsModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./Views/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: 'exams',
        loadChildren: () =>
          import('./Views/exams/exams.module').then((m) => m.ExamsModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./Views/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'examAttempts',
        loadChildren: () =>
          import('./Views/exam-attempt/exam-attempt.module').then(
            (m) => m.ExamAttemptModule
          ),
      },
    ],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
