import {Todolist} from '@todo/todolist';
import {createFeature, createReducer, on} from '@ngrx/store';
import {todolistActions} from './todolist.actions';

export interface TodolistState {
  todolists: Todolist[]
}

export const todolistInitialState: TodolistState = {
  todolists: []
}

export const todolistFeature = createFeature({
  name: 'todolistFeature',
  reducer: createReducer(
    todolistInitialState,
    on(todolistActions.loadTodolists, (state) => {
      return {
        ...state
      }
    }),
    on(todolistActions.todolistsLoaded, (state, payload) => {
      return {
        ...state,
        todolists: payload.todolists
      }
    }),
    on(todolistActions.todolistDeleted, (state, payload) => {
      return {
        ...state,
        todolists: state.todolists.filter(tl => tl.id !== payload.todolistId)
      }
    }),
    on(todolistActions.todolistCreated, (state, payload) => {
      return {
        ...state,
        todolists: [payload.todolist, ...state.todolists]
      }
    }),
    on(todolistActions.todolistUpdated, (state, payload) => {
      return {
        ...state,
        todolists: state.todolists.map(tl => tl.id === payload.todolistId ? { ...tl, title: payload.title } : tl)
      }
    }),
    on(todolistActions.todolistFiltered, (state, payload) => {
      return {
        ...state,
        todolists: state.todolists.map(tl => tl.id === payload.todolistId ? { ...tl, filter: payload.filter } : tl)
      }
    })
  )
})
