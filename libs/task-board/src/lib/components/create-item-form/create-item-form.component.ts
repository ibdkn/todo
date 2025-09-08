import {Component, ElementRef, EventEmitter, HostListener, inject, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import {ButtonComponent} from '@todo/common-ui';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-item-form',
  imports: [ButtonComponent, FormsModule, NgClass],
  templateUrl: './create-item-form.component.html',
  styleUrl: './create-item-form.component.scss',
})
export class CreateItemFormComponent {
  toastr: ToastrService = inject(ToastrService);
  private elRef = inject(ElementRef);

  @Input() buttonTitle!: string;
  @Input() buttonClass!: string;
  @Output() created = new EventEmitter();
  @Output() closed = new EventEmitter();

  inputValue: string = '';
  // TODO сейчас ошибка валидации выводится в toastr (возможно улучшение)
  inputError: string = ''; // не используется

  onCreate(): void {
    const title: string = this.inputValue.trim();
    if (!title) {
      this.toastr.error('Title is required', 'Creating item failed');
      return;
    }
    // TODO сейчас ошибка валидации выводится в toastr (возможно улучшение)
    // this.inputError = '';
    this.created.emit(title);
    this.inputValue = '';
  }

  onClose(): void {
    this.closed.emit();
  }

  // Закрыть по Escape
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.onClose();
  }

  // Закрыть при клике вне формы
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (this.elRef.nativeElement && !this.elRef.nativeElement.contains(event.target)) {
      this.onClose();
    }
  }

  // TODO сейчас ошибка валидации выводится в toastr (возможно улучшение)
  onInput(): void {
    // if (this.inputError) {
    //   this.inputError = '';
    // }
  }
}
