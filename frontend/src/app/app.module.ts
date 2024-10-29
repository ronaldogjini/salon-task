import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './core/layout/footer/footer.component';
import { RetentionTableComponent } from './routes/retention-dashboard/retention-table/retention-table.component';
import { DatePickerComponent } from './shared/ui/date-picker/date-picker.component';
import { NavComponent } from './core/layout/nav/nav.component';
import { RetentionDashboardComponent } from './routes/retention-dashboard/retention-dashboard.component';
import { HomeComponent } from './routes/home/home.component';
import { CustomDateAdapter } from './core/providers/date-picker.adapter';
import { ErrorModalComponent } from './shared/ui/error-modal/error-modal.component';
import { SpinnerComponent } from './shared/ui/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    RetentionTableComponent,
    DatePickerComponent,
    NavComponent,
    RetentionDashboardComponent,
    HomeComponent,
    FooterComponent,
    ErrorModalComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
