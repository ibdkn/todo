import { CommonModule } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { CreateItemFormComponent } from '../../components';
import { TodolistComponent } from '../todolist/todolist.component';
import {Store} from '@ngrx/store';
import {selectTasks, selectTodolists, taskActions, todolistActions} from '../../data/store';
import { Task } from '../../data/interfaces/task.interface';
import { FilterValues } from '../../data/interfaces/todolist.interface';


@Component({
  selector: 'lib-board',
  imports: [CommonModule, CreateItemFormComponent, TodolistComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  store: Store = inject(Store);

  todolists = this.store.selectSignal(selectTodolists);
  tasks = this.store.selectSignal(selectTasks);

  ngOnInit() {
    this.store.dispatch(todolistActions.loadTodolists());
    this.store.dispatch(taskActions.loadTasks());
  }

  getFilteredTasks(tasks: Task[], filter: FilterValues) {
    if (filter === 'active') return tasks.filter(task => !task.isDone);
    if (filter === 'completed') return tasks.filter(task => task.isDone);
    return tasks;
  }

  createTask(todolistId: number, title: string): void {
    console.log(todolistId)
    this.store.dispatch(taskActions.createTask({todolistId, title}));
  }

  changeTaskStatus(todolistId: number, {taskId, isDone}: { taskId: string; isDone: boolean }): void {
    this.store.dispatch(taskActions.changeTaskStatus({todolistId, taskId, isDone}));
  }

  deleteTask(todolistId: number, taskId: string): void {
    this.store.dispatch(taskActions.deleteTask({todolistId, taskId}));
  }

  updateTaskTitle(todolistId: number, {taskId, title}: { taskId: string; title: string }) {
    this.store.dispatch(taskActions.updateTaskTitle({todolistId, taskId, title}));
  }

  deleteTodolist(todolistId: number): void {
    this.store.dispatch(todolistActions.deleteTodolist({todolistId}))
  }

  createTodolist(title: string): void {
    this.store.dispatch(todolistActions.createTodolist({title}))
  }

  updateTodolistTitle(todolistId: number, title: string): void {
    this.store.dispatch(todolistActions.updateTodolist({todolistId, title}))
  }

  changeFilter(todolistId: number, filter: FilterValues) {
    this.store.dispatch(todolistActions.filterTodolist({todolistId, filter}))
  }
}
