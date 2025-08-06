import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from "@ngrx/effects";
import {todolistFeature, TodolistEffects, taskFeature, TaskEffects} from "@todo/task-board";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideStore(),
        provideEffects(),
    ],
};
