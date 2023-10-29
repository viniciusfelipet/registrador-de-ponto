import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() private onOpenMenu: EventEmitter<void> = new EventEmitter();
  @Input() isMobile!: boolean;
  title: string = "";

  onClick() {
    this.onOpenMenu.emit()
  }
}
