import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Componente1 } from './componente1/componente1.component';
import { Componente2 } from './componente2/componente2.component';

@NgModule({
  declarations: [
    AppComponent,
    Componente1,
    Componente2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
