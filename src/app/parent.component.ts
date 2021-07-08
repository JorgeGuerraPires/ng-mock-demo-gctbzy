import { Component } from '@angular/core';

@Component({
  selector: 'parent',
  template: `
<div>I am a parent. These are my children:</div>
<child *ngFor="let child of children"
[selected]="selected" [childName]="child" (select)="onSelect($event)"></child>`
}) 
export class ParentComponent {
  children: string[] = ['Bart', 'Lisa', 'Maggie'];
  selected = '';

  onSelect(child) {    
    this.selected = child;    
  }
}