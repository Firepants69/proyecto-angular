import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownEComponent } from './markdown-e.component';

describe('MarkdownEComponent', () => {
  let component: MarkdownEComponent;
  let fixture: ComponentFixture<MarkdownEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownEComponent,]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkdownEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
