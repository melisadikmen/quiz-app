import { Component } from '@angular/core';
import { MainModel } from '../models/data';
import { QuizService } from '../quiz.service';
import { QuestionAreaComponent } from "./question-area/question-area.component";

@Component({
  selector: 'app-page3',
  standalone: true,
  imports: [QuestionAreaComponent],
  templateUrl: './page3.component.html',
  styleUrl: './page3.component.scss'
})
export class Page3Component {
  third50Questions: MainModel[] = [];
  constructor(private _quizService: QuizService) { }
  ngOnInit(): void {
    const allQuestions = this._quizService.getAllQuestions();
    this.third50Questions = allQuestions.slice(100, 150);
  }
}
