import { ComponentFixture, TestBed } from '@angular/core/testing';

import { editPostComponent } from './edit-post.component';

describe('MakePostComponent', () => {
  let component: editPostComponent;
  let fixture: ComponentFixture<editPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [editPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(editPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
