import { Component, ComponentRef, Directive, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[dialogTemplate]',
  exportAs: 'dialogTemplate'
})
export class DialogTemplate {
  public templateRef: TemplateRef<any> = inject(TemplateRef);
  static ngTemplateContextGuard(
    directive: DialogTemplate,
    context: unknown
  ): context is DialogContext {
    return true;
  }
}

interface DialogContext {
  close: () => void;
  submit: ($event: any) => void;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  public readonly dialogContext: DialogContext = { close: this.close.bind(this), submit: this.submit.bind(this) };

  @Input() headerText!: string;
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() dialogComponentRef!: ComponentRef<DialogComponent>;
  @Output() submitEvent = new EventEmitter();

  public submit($event: any): void {
    this.submitEvent.emit($event);
    this.close();
  }

  public close(): void {
    this.submitEvent.complete();
    this.dialogComponentRef.destroy();
  }
}
