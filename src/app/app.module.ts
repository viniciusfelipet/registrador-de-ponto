import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PontoComponent } from './pages/ponto/ponto.component';
import { MarcacoesComponent } from './pages/marcacoes/marcacoes.component';
import { JornadaComponent } from './pages/jornada/jornada.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

registerLocaleData(localePtBr);
moment.locale('pt')

@NgModule({
  declarations: [
    AppComponent,
    PontoComponent,
    MarcacoesComponent,
    JornadaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
