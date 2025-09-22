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

  @Input() buttonClass!: string;
  @Input() itemName!: string;
  @Output() created = new EventEmitter();

  inputValue: string = '';
  inputError: string = '';

  onCreate(): void {
    const title: string = this.inputValue.trim();
    if (!title) {
      this.toastr.error(`The name of ${this.itemName} is required`, `Creating new ${this.itemName} was failed`);
      this.inputError = `The name of ${this.itemName} is required`;
      return;
    }
    this.inputError = '';
    this.inputValue = '';
    this.created.emit(title);
  }

  onInput(): void {
    if (this.inputError) {
      this.inputError = '';
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent): void {
    event.preventDefault();
    this.onInput();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!this.elRef.nativeElement.contains(target)) {
      this.onInput();
    }
  }
}
