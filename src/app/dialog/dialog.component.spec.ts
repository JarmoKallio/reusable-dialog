import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DialogComponent, DialogTemplate } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let templateWrapperFixture: ComponentFixture<TemplateWrapperComponent>;
  let contentTemplate: TemplateRef<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateWrapperComponent, DialogTemplate]
    }).compileComponents();
    fixture = TestBed.createComponent(DialogComponent);
    templateWrapperFixture = TestBed.createComponent(TemplateWrapperComponent);
    contentTemplate = templateWrapperFixture.componentInstance.dialogTemplate.templateRef;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render headerText', () => {
    const headerText: string = "header text";
    component.headerText = headerText;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    expect(compiled.querySelector('#dialogHeader')?.textContent).toContain(headerText);
  });

  it('should render close button', () => {
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).toBeTruthy();
  });

  it('clicking button should call close method', fakeAsync(() => {
    spyOn(component, 'close');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.close).toHaveBeenCalled();
  }));

  it('should render contentTemplate', () => {
    component.contentTemplate = contentTemplate;
    fixture.detectChanges();
    const element: DebugElement = fixture.debugElement;
    expect(element.nativeElement.querySelector('#buttonClose')).toBeTruthy();
    expect(element.nativeElement.querySelector('#buttonSubmit')).toBeTruthy();
  });

  it('Should be destroyed when clicking a button bound to its close method', fakeAsync(() => {
    let dialogComponentRef = fixture.componentRef;
    component.dialogComponentRef = dialogComponentRef;
    component.contentTemplate = contentTemplate;
    fixture.detectChanges();
    spyOn(dialogComponentRef, 'destroy');
    const button = fixture.debugElement.nativeElement.querySelector('#buttonClose');
    button.click();
    tick();
    expect(dialogComponentRef.destroy).toHaveBeenCalled();
  }));

  it('Should be destroyed when clicking a button bound to its submit method', fakeAsync(() => {
    let dialogComponentRef = fixture.componentRef;
    component.dialogComponentRef = dialogComponentRef;
    component.contentTemplate = contentTemplate;
    fixture.detectChanges();
    spyOn(dialogComponentRef, 'destroy');
    const button = fixture.debugElement.nativeElement.querySelector('#buttonSubmit');
    button.click();
    tick();
    expect(dialogComponentRef.destroy).toHaveBeenCalled();
  }));
});

@Component({
  template: `
    <ng-template dialogTemplate let-close="close" let-submit="submit" #dialogWithForm="dialogTemplate">
      <button type="button" (click)="close()" class="btn btn-primary" id="buttonClose">Close from template</button>
      <button type="button" (click)="submit($event)" class="btn btn-primary" id="buttonSubmit">Submit from template</button>
    </ng-template>
  `
})
class TemplateWrapperComponent {
  @ViewChild('dialogWithForm', { static: true }) dialogTemplate!: DialogTemplate;
}
