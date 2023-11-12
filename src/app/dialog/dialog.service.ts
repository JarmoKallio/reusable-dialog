import { ApplicationRef, ComponentRef, EventEmitter, Injectable, ViewContainerRef } from "@angular/core";
import { DialogComponent, DialogTemplate } from "./dialog.component";

@Injectable()
export class DialogService {

  constructor(private applicationRef: ApplicationRef) {}

  public openDialog(template: DialogTemplate, title: string): EventEmitter<any>  {
    const viewContainerRef: ViewContainerRef = this.applicationRef.components[0].injector.get(ViewContainerRef);
    const dialogComponentRef: ComponentRef<DialogComponent> = viewContainerRef.createComponent(DialogComponent);    
    let dialogComponentInstance: DialogComponent = dialogComponentRef.instance;
    dialogComponentInstance.headerText = title;
    dialogComponentInstance.contentTemplate = template.templateRef;
    dialogComponentInstance.dialogComponentRef = dialogComponentRef;
    return dialogComponentInstance.submitEvent;
  }
}