import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './shared/component/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [BrowserModule, BrowserAnimationsModule , ReactiveFormsModule ,MatSnackBarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
