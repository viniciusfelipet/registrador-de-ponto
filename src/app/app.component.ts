import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatSidenav } from '@angular/material/sidenav';

interface Nav {
  name: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMobile = false;

  navs: Nav[] = [
    {
      name: "Registrar ponto",
      icon: "touch_app",
      route: "/ponto"
    },
    {
      name: "Marcações",
      icon: "history",
      route: "/marcacoes"
    },
    {
      name: "Jornada",
      icon: "calendar_today",
      route: "/jornada"
    }
  ]
  
  navSelected: Nav;

  @ViewChild('header') header!: HeaderComponent;
  @ViewChild(MatSidenav) sidenav!: MatSidenav

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth <= 660;
  }

  constructor() {
    this.onResize();
    this.navSelected = this.navs[0]
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.setHeaderTitle()
    }, 100);
  }

  onClickMenu(nav: Nav) {
    if (this.isMobile) 
      this.sidenav.close();
    
    this.navSelected = nav;
    this.setHeaderTitle()
  }

  setHeaderTitle() {
    this.header.title = this.navSelected.name
    document.title = this.header.title
  }
}
