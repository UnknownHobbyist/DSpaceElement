import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AbstractComponent } from './abstract/abstract.component';

import { HttpClientModule } from '@angular/common/http';
import { HightlightPipe } from './hightlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AbstractComponent,
    HightlightPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
