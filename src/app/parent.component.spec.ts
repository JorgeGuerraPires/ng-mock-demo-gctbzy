import { RouterTestingModule } from '@angular/router/testing';
import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} 
from '@angular/platform-browser-dynamic/testing';
import { ParentComponent } from './parent.component';
import { ChildComponent } from './child.component';
import { Router } from '@angular/router';
import { Component, NO_ERRORS_SCHEMA, Input, Output, EventEmitter } from "@angular/core";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';

describe('Parent Component', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComponent,      
      MockComponent(ChildComponent)],      

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();    
  });


  it('should create one child component for each child', () => {
    expect(childComponents().length).toEqual(component.children.length);
  });

  it('should set child to the name of the child', () => {
    expect(childComponents().map(c => c.childName)).toEqual(
      component.children
    );
  });

  it('should update selected if child component emits select', () => {
    expect(component.selected).toEqual('');
    childComponents()[0].select.emit(childComponents()[0].childName);
    expect(component.selected).toEqual(childComponents()[0].childName);
  });

  it('should set selected to the name of the selected child', () => {
    childComponents()[0].select.emit(childComponents()[0].childName);
    fixture.detectChanges();
    childComponents().map(c => c.selected).forEach(
      selected => expect(selected).toEqual(childComponents()[0].childName)
    );
  });

  // helper function to query all the ChildComponents
  function childComponents(): ChildComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(ChildComponent))
      .map(el => el.componentInstance);
  }
});
