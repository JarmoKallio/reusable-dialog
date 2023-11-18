import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit, OnDestroy {
  @Output() closeEvent = new EventEmitter<any>();

  submit(value: string) {
    this.closeEvent.emit(value);
  }

  close() {
    this.closeEvent.emit();
  }

  ngOnInit(): void {
    console.log("ContentComponent created");
  }

  ngOnDestroy(): void {
    console.log("ContentComponent destroyed");
  }
}
