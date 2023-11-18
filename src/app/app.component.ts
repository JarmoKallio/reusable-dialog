import { ApplicationRef, Component, ViewContainerRef } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
import { DialogTemplate } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private dialogService: DialogService, private applicationRef: ApplicationRef) { }

  openDialog(template: DialogTemplate, title: string) {
    const viewContainerRef: ViewContainerRef = this.applicationRef.components[0].injector.get(ViewContainerRef);
    this.dialogService.openDialog(template, title, viewContainerRef).subscribe(
      (next: any) => { console.log(next); },
      (error: any) => { console.error(error); },
      (complete: any) => { console.log("complete"); }
    );
  }
}
