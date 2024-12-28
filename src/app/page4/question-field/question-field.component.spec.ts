import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFieldComponent } from './question-field.component';

describe('QuestionFieldComponent', () => {
  let component: QuestionFieldComponent;
  let fixture: ComponentFixture<QuestionFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
