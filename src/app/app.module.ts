import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent, DialogTemplate } from './dialog/dialog.component';
import { ContentComponent } from './content/content.component';
import { DialogService } from './dialog/dialog.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, DialogComponent, ContentComponent, DialogTemplate],
  providers: [DialogService],
  bootstrap: [AppComponent],
})
export class AppModule { }
