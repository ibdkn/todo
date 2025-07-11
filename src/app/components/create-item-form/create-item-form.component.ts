import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonComponent} from '../button/button.component';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-create-item-form',
  imports: [
    ButtonComponent,
    FormsModule,
    NgClass
  ],
  templateUrl: './create-item-form.component.html',
  styleUrl: './create-item-form.component.scss'
})
export class CreateItemFormComponent {
  @Input() buttonTitle!: string;
  @Output() created = new EventEmitter();

  inputValue: string = '';
  inputError: string = '';

  onCreate() {
    const title = this.inputValue.trim();
    if (!title) {
      this.inputError = 'Title is required';
      return;
    }
    this.inputError = '';
    this.created.emit(title);
    this.inputValue = '';
  }

  onInput() {
    if (this.inputError) {
      this.inputError = '';
    }
  }
}
