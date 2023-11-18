import { ComponentRef, EventEmitter, Injectable, ViewContainerRef } from "@angular/core";
import { DialogComponent, DialogTemplate } from "./dialog.component";

@Injectable()
export class DialogService {

  public openDialog(template: DialogTemplate, title: string, viewContainerRef: ViewContainerRef): EventEmitter<any> {
    const dialogComponentRef: ComponentRef<DialogComponent> = viewContainerRef.createComponent(DialogComponent);
    let dialogComponentInstance: DialogComponent = dialogComponentRef.instance;
    dialogComponentInstance.headerText = title;
    dialogComponentInstance.contentTemplate = template.templateRef;
    dialogComponentInstance.dialogComponentRef = dialogComponentRef;
    return dialogComponentInstance.submitEvent;
  }
}