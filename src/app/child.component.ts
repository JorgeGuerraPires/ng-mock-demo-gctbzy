import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'child',
  template: `
<div (click)="onSelect()">
  {{childName}}
  <span *ngIf="selected == child"> ♥ </span>
</div>
`
})
export class ChildComponent {
  @Input() selected: string = '';
  @Input() childName: string = '';
  @Output() select = new EventEmitter<string>();

  onSelect() {    
    this.select.emit(this.childName);
  }
}