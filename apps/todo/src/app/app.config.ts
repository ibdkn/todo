import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from "@ngrx/effects";
import {todolistFeature, TodolistsEffects} from "@todo/todolist";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideStore(),
        provideEffects(),
        provideState(todolistFeature),
        provideEffects(TodolistsEffects),
    ],
};
