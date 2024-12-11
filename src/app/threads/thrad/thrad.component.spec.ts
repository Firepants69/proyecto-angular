import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThradComponent } from './thrad.component';

describe('ThradComponent', () => {
  let component: ThradComponent;
  let fixture: ComponentFixture<ThradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThradComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
