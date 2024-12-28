import { Component } from '@angular/core';
import { QuestionFieldComponent } from "./question-field/question-field.component";
import { MainModel } from '../models/data';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-page4',
  standalone: true,
  imports: [QuestionFieldComponent],
  templateUrl: './page4.component.html',
  styleUrl: './page4.component.scss'
})
export class Page4Component {
  fourth50Questions: MainModel[] = [];
  constructor(private _quizService: QuizService) { }
  ngOnInit(): void {
    const allQuestions = this._quizService.getAllQuestions();
    this.fourth50Questions = allQuestions.slice(150, 200);
  }
}
