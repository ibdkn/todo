import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from '@todo/common-ui';
import {CreateItemFormComponent} from '@todo/task-board';

@Component({
  selector: 'lib-create-item',
  imports: [CommonModule, ButtonComponent, CreateItemFormComponent],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss',
})
export class CreateItemComponent {
  isOpen = signal<boolean>(false);

  @Input() buttonTitle!: string;
  @Input() buttonClass!: string;
  @Output() created = new EventEmitter<string>();

  createHandler(title: string): void {
    this.created.emit(title)
  }

  showCreateItemForm(): void {
    this.isOpen.set(true);
  }

  hideCreateItemForm(): void {
    this.isOpen.set(false);
  }
}
