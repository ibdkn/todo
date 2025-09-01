import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {ButtonComponent, ConfirmDialogComponent} from '@todo/common-ui';
import {CreateItemFormComponent, EditableSpanComponent} from '../../components';
import {FilterValues, Task, Todolist} from '../../data';

@Component({
  selector: 'app-todolist',
  imports: [
    ButtonComponent,
    FormsModule,
    CreateItemFormComponent,
    EditableSpanComponent,
    NgClass,
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent {
  @Input() title!: string;
  @Input() todolist!: Todolist;
  @Input() tasks!: Task[];

  @Output() filtered: EventEmitter<FilterValues> = new EventEmitter<FilterValues>();
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() created: EventEmitter<string> = new EventEmitter<string>();
  @Output() statusChanged: EventEmitter<{ taskId: number; isDone: boolean }> = new EventEmitter<{
    taskId: number;
    isDone: boolean
  }>();
  @Output() todolistDeleted = new EventEmitter();
  @Output() taskTitleChanged = new EventEmitter();
  @Output() todolistTitleChanged = new EventEmitter();
  @Output() confirmDialogOpened = new EventEmitter();

  openConfirmDialog(): void {
    this.confirmDialogOpened.emit(true);
  }

  deleteTaskHandler(taskId: number): void {
    this.deleted.emit(taskId);
  }

  changeFilterHandler(filter: FilterValues): void {
    this.filtered.emit(filter);
  }

  createTaskHandler(title: string): void {
    this.created.emit(title);
  }

  changeTaskStatusHandler(taskId: number, e: Event): void {
    const newTaskStatus: boolean = (e.currentTarget as HTMLInputElement).checked;
    this.statusChanged.emit({taskId, isDone: newTaskStatus});
  }

  // TODO пока не используется, удаление через попап
  // deleteTodolistHandler(): void {
  //   this.todolistDeleted.emit();
  // }

  updateTaskTitleHandler(taskId: number, title: string): void {
    this.taskTitleChanged.emit({title, taskId});
  }

  updateTodolistTitleHandler(title: string): void {
    this.todolistTitleChanged.emit(title);
  }
}
