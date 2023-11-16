import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isMobile!: boolean;
  @Output() private onOpenMenu: EventEmitter<void> = new EventEmitter()
  
  title: string = "";

  onClick() {
    this.onOpenMenu.emit()
  }
}
