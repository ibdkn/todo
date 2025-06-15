import {Component, EventEmitter, Input, Output, Signal} from '@angular/core';
import {Task, TaskStatus} from '../../interfaces/task.interface';
import {ButtonComponent} from '../button/button.component';
import {FormsModule} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-todolist',
  imports: [
    ButtonComponent,
    FormsModule,
    NgClass
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})
export class TodolistComponent {
  @Input() title: string = '';
  @Input() tasks!: Signal<Task[]>;
  @Input() filter!: Signal<TaskStatus>;

  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() filtered: EventEmitter<TaskStatus> = new EventEmitter<TaskStatus>();
  @Output() created: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() changed: EventEmitter<Pick<Task, 'id' | 'isDone'>> = new EventEmitter<Pick<Task, 'id' | 'isDone'>>();

  taskTitle: string = '';
  inputError: string = '';

  onDelete(taskId: string): void {
    this.deleted.emit(taskId);
  }

  onFilter(status: TaskStatus): void {
    this.filtered.emit(status);
  }

  onCreateTask(): void {
    const id: string = uuidv4();
    const title: string = this.taskTitle.trim();
    if (!title) {
      this.inputError = 'Title is required';
      return;
    }
    this.inputError = '';
    this.created.emit({id, title, isDone: false});
    this.taskTitle = '';
  }

  onChangeTaskStatus(id: string, e: Event): void {
    const newTaskStatus: boolean = (e.currentTarget as HTMLInputElement).checked;
    this.changed.emit({id, isDone: newTaskStatus});
  }

  onInput(): void {
    if (this.inputError) {
      this.inputError = '';
    }
  }
}
