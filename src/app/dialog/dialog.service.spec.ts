import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { Component, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogTemplate } from './dialog.component';

describe('DialogService', () => {
  let service: DialogService;
  let templateWrapperFixture: ComponentFixture<TemplateWrapperComponentForService>;
  let dialogTemplate: DialogTemplate;
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateWrapperComponentForService, DialogTemplate], providers: [DialogService]
    }).compileComponents();
    service = TestBed.inject(DialogService);

    templateWrapperFixture = TestBed.createComponent(TemplateWrapperComponentForService);
    templateWrapperFixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });

  it('should open dialog component', () => {
    const titleToFind = "testTitleToFind";
    const element = templateWrapperFixture.debugElement.nativeElement as HTMLElement;
    let buttonClose = element.querySelector('#buttonClose');
    let buttonSubmit = element.querySelector('#buttonSubmit');
    let dialogHeader = element.querySelector('#dialogHeader');
    expect(buttonClose).toBeFalsy();
    expect(buttonSubmit).toBeFalsy();
    expect(dialogHeader).toBeFalsy();
    
    dialogTemplate = templateWrapperFixture.componentInstance.dialogTemplate;
    viewContainerRef = templateWrapperFixture.componentInstance.viewContainerRef;
    
    service.openDialog(dialogTemplate, titleToFind, viewContainerRef);

    templateWrapperFixture.detectChanges();

    buttonClose = element.querySelector('#buttonClose');
    buttonSubmit = element.querySelector('#buttonSubmit');
    dialogHeader = element.querySelector('#dialogHeader');
    expect(buttonClose).toBeTruthy();
    expect(buttonSubmit).toBeTruthy();
    expect(dialogHeader).toBeTruthy();
    expect(dialogHeader?.textContent).toContain(titleToFind);
  });


  it('clicking close button should remove dialog', fakeAsync(() => {
    const element = templateWrapperFixture.debugElement.nativeElement as HTMLElement;
    dialogTemplate = templateWrapperFixture.componentInstance.dialogTemplate;
    viewContainerRef = templateWrapperFixture.componentInstance.viewContainerRef;
    
    service.openDialog(dialogTemplate, "title", viewContainerRef);
    templateWrapperFixture.detectChanges();
    let dialogHeader = element.querySelector('#dialogHeader') as HTMLElement;
    expect(dialogHeader).toBeTruthy();

    const buttonClose = element.querySelector('#buttonClose') as HTMLElement;
    buttonClose.click();
    tick();

    dialogHeader = element.querySelector('#dialogHeader') as HTMLElement;
    expect(dialogHeader).toBeFalsy();
  }));

  it('clicking submit button should remove dialog and send event, subscriber should receive it', fakeAsync(() => {
    const element = templateWrapperFixture.debugElement.nativeElement as HTMLElement;
    dialogTemplate = templateWrapperFixture.componentInstance.dialogTemplate;
    viewContainerRef = templateWrapperFixture.componentInstance.viewContainerRef;
    
    const eventReceivingClass = {destroy() {}};
    spyOn(eventReceivingClass, 'destroy');

    service.openDialog(dialogTemplate, "title", viewContainerRef).subscribe(event => {
      event === 'SUBMITTED_STRING' && eventReceivingClass.destroy();
    });
    templateWrapperFixture.detectChanges();
    let dialogHeader = element.querySelector('#dialogHeader') as HTMLElement;
    expect(dialogHeader).toBeTruthy();

    const buttonClose = element.querySelector('#buttonSubmit') as HTMLElement;
    buttonClose.click();
    tick();

    dialogHeader = element.querySelector('#dialogHeader') as HTMLElement;
    expect(dialogHeader).toBeFalsy();
    expect(eventReceivingClass.destroy).toHaveBeenCalled();
  }));
});

@Component({
  template: `
    <ng-container #viewContainer><ng-container>
    <ng-template dialogTemplate let-close="close" let-submit="submit" #dialogWithForm="dialogTemplate">
      <button type="button" (click)="close()" class="btn btn-primary" id="buttonClose">Close from template</button>
      <button type="button" (click)="submit('SUBMITTED_STRING')" class="btn btn-primary" id="buttonSubmit">Submit from template</button>
    </ng-template>
  `
})
class TemplateWrapperComponentForService {
  @ViewChild('dialogWithForm', { static: true }) dialogTemplate!: DialogTemplate;
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;
}
