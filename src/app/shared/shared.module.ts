import { MaterialModule } from './material.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import * as moment from 'moment';
import localePtBr from '@angular/common/locales/pt';

registerLocaleData(localePtBr);
moment.locale('pt')
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfirmDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule
  ],
  providers: [
    provideEnvironmentNgxMask(),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        verticalPosition: 'top'
      }
    },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { hideRequiredMarker: true }
    }
  ]
})
export class SharedModule { }
