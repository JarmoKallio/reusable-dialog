import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, DialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
