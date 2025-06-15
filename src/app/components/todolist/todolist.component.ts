import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task, TaskStatus} from '../../interfaces/task.interface';
import {ButtonComponent} from '../button/button.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-todolist',
  imports: [
    ButtonComponent,
    FormsModule
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})
export class TodolistComponent {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];

  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() changed: EventEmitter<TaskStatus> = new EventEmitter<TaskStatus>();
  @Output() created: EventEmitter<Task> = new EventEmitter<Task>();

  taskTitle: string = '';

  onDelete(taskId: number): void {
    this.deleted.emit(taskId);
  }

  onChangeFilter(status: TaskStatus): void {
    this.changed.emit(status);
  }

  onCreateTask(): void {
    const id: number = this.tasks.length;
    const title: string = this.taskTitle.trim();
    if (!title) return;
    this.created.emit({id, title, isDone: false});
    this.taskTitle = '';
  }
}
