import { Component } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
import { DialogTemplate } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialogService: DialogService) {}

  openDialog(template: DialogTemplate, title: string) {
    this.dialogService.openDialog(template, title).subscribe(
      (next: any) => { console.log(next); },
      (error: any) => { console.error(error); },
      (complete: any) => {console.log("complete");}
    );
  }
}
