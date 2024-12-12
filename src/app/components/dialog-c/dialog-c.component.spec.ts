import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCComponent } from './dialog-c.component';

describe('DialogCComponent', () => {
  let component: DialogCComponent;
  let fixture: ComponentFixture<DialogCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
