import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() buttonClass: string = '';

  @Output() clicked = new EventEmitter();

  onClick(): void {
    this.clicked.emit();
  }
}
