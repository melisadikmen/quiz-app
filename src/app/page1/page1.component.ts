import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { QuestionCardComponent } from "./question-card/question-card.component";
import { MainModel } from '../models/data';
import { QuizService } from '../quiz.service';
@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [MatCardModule, QuestionCardComponent],
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component {
  first50Questions: MainModel[] = [];
  constructor(private _quizService: QuizService) { }
  ngOnInit(): void {
    const allQuestions = this._quizService.getAllQuestions();
    this.first50Questions = allQuestions.slice(0, 50);
  }
}
