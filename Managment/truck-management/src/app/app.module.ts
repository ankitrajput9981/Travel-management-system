import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TruckFormComponent } from './components/truck-form.component';
import { TruckListComponent } from './components/truck-list.component';
import { MonthlyExpensesComponent } from './components/monthly-expenses.component';
import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TruckFormComponent,
    TruckListComponent,
    MonthlyExpensesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
