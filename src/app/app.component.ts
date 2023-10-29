import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
  
  @ViewChild(MatSidenav) sidenav!: MatSidenav
  @ViewChild('header') header!: HeaderComponent;
  
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth <= 660;
  }

  constructor(
    private router: Router,
  ) {
    this.onResize();
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.setHeaderTitle()

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd)
          this.setHeaderTitle()
      });
    }, 100);
  }

  onClickMenu() {
    if (this.isMobile) 
      this.sidenav.close();
  }

  setHeaderTitle() {
    const title = this.navs.find(f => f.route == this.router.url)?.name || ""
    
    this.header.title = title
    document.title = title
  }
}
