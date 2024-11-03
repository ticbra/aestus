import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material moduli
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// NgxMatDatetimePicker moduli

// Vaše komponente
import { AppComponent } from './app.component';
import { SettingComponent } from './components/setting/setting.component';
import { SettingDialogComponent } from './setting-dialog/setting-dialog.component';
import { DateTimeModule } from 'nxt-pick-datetime'
import { NativeDateTimeModule } from 'nxt-pick-datetime/native-adapter';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    SettingComponent,
    SettingDialogComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Angular Material moduli
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DateTimeModule,
    NativeDateTimeModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
