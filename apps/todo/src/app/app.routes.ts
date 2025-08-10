import {Routes} from '@angular/router';
import {canActivateAuth, LoginComponent} from '@todo/auth';
import {LayoutComponent} from '@todo/layout';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {BoardComponent, TaskEffects, taskFeature, TodolistEffects, todolistFeature} from '@todo/task-board';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'task-board', pathMatch: 'full'},
      {
        path: 'task-board',
        component: BoardComponent,
        providers: [
          provideState(todolistFeature),
          provideState(taskFeature),
          provideEffects(TodolistEffects, TaskEffects),
        ],
        canActivate: [canActivateAuth],
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
];
