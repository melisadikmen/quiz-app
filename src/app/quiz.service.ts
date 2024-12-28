import { Injectable } from '@angular/core';
import { MainModel } from './models/data';
import { SampleData } from './models/example-data.const';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private allQuestions: MainModel[] = SampleData;
  getAllQuestions(): MainModel[] {
    return this.allQuestions
  }
}
