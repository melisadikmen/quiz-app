import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPartComponent } from './question-part.component';

describe('QuestionPartComponent', () => {
  let component: QuestionPartComponent;
  let fixture: ComponentFixture<QuestionPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionPartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
