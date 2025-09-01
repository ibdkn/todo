import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from '@todo/common-ui';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  @Output() closed = new EventEmitter<boolean>();

  closeDialog(result: boolean = false) {
    this.closed.emit(result);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeDialog(false);
  }
}
