import { CommonModule } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { CreateItemFormComponent } from '../../components';
import { TodolistComponent } from '../todolist/todolist.component';
import {Store} from '@ngrx/store';
import {selectTasks, selectTodolists, taskActions, todolistActions} from '../../data/store';
import { Task } from '../../data/interfaces/task.interface';
import { FilterValues } from '../../data/interfaces/todolist.interface';
import { ConfirmDialogComponent } from '@todo/common-ui';
import {CreateItemComponent} from '../../components/create-item/create-item.component';


@Component({
  selector: 'lib-board',
  imports: [CommonModule, TodolistComponent, ConfirmDialogComponent, CreateItemComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  store: Store = inject(Store);

  todolists = this.store.selectSignal(selectTodolists);
  tasks = this.store.selectSignal(selectTasks);

  isConfirmDialogOpen = false;
  openedTodolistId: null | number = null;

  ngOnInit() {
    this.store.dispatch(todolistActions.loadTodolists());
    this.store.dispatch(taskActions.loadTasks());
  }

  openConfirmDialog(todolistId: number) {
    this.isConfirmDialogOpen = true;
    this.openedTodolistId = todolistId;
  }

  handleDialogClosed(result: boolean) {
    this.isConfirmDialogOpen = false;
    if (result && this.openedTodolistId) {
      this.store.dispatch(todolistActions.deleteTodolist({ todolistId: this.openedTodolistId }));
      this.openedTodolistId = null;
    }
  }

  getFilteredTasks(tasks: Task[], filter: FilterValues) {
    if (filter === 'active') return tasks.filter(task => !task.isDone);
    if (filter === 'completed') return tasks.filter(task => task.isDone);
    return tasks;
  }

  createTask(todolistId: number, title: string): void {
    this.store.dispatch(taskActions.createTask({todolistId, title}));
  }

  changeTaskStatus(todolistId: number, {taskId, isDone}: { taskId: number; isDone: boolean }): void {
    this.store.dispatch(taskActions.changeTaskStatus({todolistId, taskId, isDone}));
  }

  deleteTask(todolistId: number, taskId: number): void {
    this.store.dispatch(taskActions.deleteTask({todolistId, taskId}));
  }

  updateTaskTitle(todolistId: number, {taskId, title}: { taskId: number; title: string }) {
    this.store.dispatch(taskActions.updateTaskTitle({todolistId, taskId, title}));
  }

  // TODO пока не используется, удаление через попап
  // deleteTodolist(todolistId: number): void {
  //   this.store.dispatch(todolistActions.deleteTodolist({todolistId}))
  // }

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
