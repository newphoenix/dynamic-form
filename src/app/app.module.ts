import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormFactoryComponent } from './components/dynamic-form-all/form-factory/form-factory.component';
import { DynamicFormAllComponent } from './components/dynamic-form-all/dynamic-form-all.component';
import { DynamicCheckboxComponent } from './components/dynamic/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicErrorComponent } from './components/dynamic/dynamic-error/dynamic-error.component';
import { DynamicFileInputComponent } from './components/dynamic/dynamic-file-input/dynamic-file-input.component';
import { DynamicSelectComponent } from './components/dynamic/dynamic-select/dynamic-select.component';
import { DynamicTextareaComponent } from './components/dynamic/dynamic-textarea/dynamic-textarea.component';
import { DynamicRadioComponent } from './components/dynamic/dynamic-radio/dynamic-radio.component';
import { DynamicInputComponent } from './components/dynamic/dynamic-input/dynamic-input.component';

@NgModule({
  declarations: [
    AppComponent, 
    FormFactoryComponent,
    DynamicFormAllComponent,
    DynamicCheckboxComponent,
    DynamicErrorComponent,
    DynamicFileInputComponent,
    DynamicSelectComponent,
    DynamicTextareaComponent,
    DynamicRadioComponent,
    DynamicInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
