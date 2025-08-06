import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {ButtonComponent} from '@todo/common-ui';
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
    @Output() deleted: EventEmitter<string> = new EventEmitter<string>();
    @Output() created: EventEmitter<string> = new EventEmitter<string>();
    @Output() statusChanged: EventEmitter<{ taskId: string; isDone: boolean }> = new EventEmitter<{ taskId: string; isDone: boolean }>();
    @Output() todolistDeleted = new EventEmitter();
    @Output() taskTitleChanged = new EventEmitter();
    @Output() todolistTitleChanged = new EventEmitter();

    deleteTaskHandler(taskId: string): void {
        this.deleted.emit(taskId);
    }

    changeFilterHandler(filter: FilterValues) {
        this.filtered.emit(filter);
    }

    createTaskHandler(title: string): void {
        this.created.emit(title);
    }

    changeTaskStatusHandler(taskId: string, e: Event): void {
        const newTaskStatus: boolean = (e.currentTarget as HTMLInputElement).checked;
        this.statusChanged.emit({taskId, isDone: newTaskStatus});
    }

    deleteTodolistHandler() {
        this.todolistDeleted.emit();
    }

    updateTaskTitleHandler(taskId: string, title: string) {
        this.taskTitleChanged.emit({title, taskId});
    }

    updateTodolistTitleHandler(title: string) {
        this.todolistTitleChanged.emit(title);
    }
}
