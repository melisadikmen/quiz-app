import { Component } from '@angular/core';
import { QuestionPartComponent } from "./question-part/question-part.component";
import { QuizService } from '../quiz.service';
import { MainModel } from '../models/data';
@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [QuestionPartComponent],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})
export class Page2Component {
  second50Questions: MainModel[] = [];
  constructor(private _quizService: QuizService) { }
  ngOnInit(): void {
    const allQuestions = this._quizService.getAllQuestions();
    this.second50Questions = allQuestions.slice(50, 100);
  }
}
