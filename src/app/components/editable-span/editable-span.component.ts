import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AutoFocusDirective} from '../../directives/auto-focus.directive';
import {CreateItemFormComponent} from '../create-item-form/create-item-form.component';

@Component({
  selector: 'app-editable-span',
  imports: [
    FormsModule,
    AutoFocusDirective,
  ],
  templateUrl: './editable-span.component.html',
  styleUrl: './editable-span.component.scss'
})
export class EditableSpanComponent {
  @Input() title!: string;
  @Output() titleChanged = new EventEmitter();

  isEditMode: boolean = false;
  currentTitle: string = '';

  turnOnEditMode() {
    this.isEditMode = true;
    this.currentTitle = this.title;
  }

  turnOffEditMode() {
    this.isEditMode = false;
    if (this.currentTitle.trim() && this.currentTitle !== this.title) {
      this.titleChanged.emit(this.currentTitle.trim());
    }
  }
}
