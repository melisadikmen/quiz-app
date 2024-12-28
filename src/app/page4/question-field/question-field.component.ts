import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SampleData } from '../../models/example-data.const';
import { MainModel, OptionDataModel } from '../../models/data';
import { MatSnackBar } from '@angular/material/snack-bar';
import confetti from 'canvas-confetti';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-question-field',
  standalone: true,
  imports: [MatCardModule, CommonModule, FormsModule, MatRadioModule, MatButtonModule],
  templateUrl: './question-field.component.html',
  styleUrl: './question-field.component.scss'
})
export class QuestionFieldComponent {
  sampleData = SampleData;
  selectedOptionId: string | null = null;
  isCorrect: boolean = false;
  currentQuestionIndex = 0;
  puan = 0;
  isStop: boolean = false;
  isAnimating = false;
  counter: { min: number, sec: number } = { min: 0, sec: 0 };
  intervalId: any;
  @Input() questions!: MainModel[];
  @Input() options: OptionDataModel[] = [];
  @Output() optionSelected = new EventEmitter<{ questionId: number, selectedOptionId: string }>();
  constructor(private _snackBar: MatSnackBar, private _router: Router, private _userService: UserService) { }
  ngOnInit(): void {
    this.startTimer();
  }
  get currentQuestion(): MainModel {
    return this.questions[this.currentQuestionIndex];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('Data Changed:', changes['data'].currentValue);
      console.log('Correct Option ID in Data:', changes['data'].currentValue.correctOptionId);
      this.selectedOptionId = null;
    }
  }
  onOptionSelected(optionId: string): void {
    this.isStop = true;
    this.selectedOptionId = optionId;
    const isCorrect = this.checkAnswer();
    this.isCorrect = isCorrect;
    if (isCorrect) {
      this.celebrate();
      this._snackBar.open('Doğru cevap!', 'Kapat', { duration: 2000 });
      this.puan += this.counter.sec * 10;
      this.triggerScoreAnimation();
    } else {
      this._snackBar.open('Yanlış cevap!', 'Kapat', { duration: 1000 });
      this.nextQuestion();
    }

    this.optionSelected.emit({
      questionId: this.currentQuestion.id || -1,
      selectedOptionId: optionId,
    });
  }
  triggerScoreAnimation(): void {
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }
  checkAnswer(): boolean {
    const selected = this.selectedOptionId?.trim().toLowerCase();
    const correct = this.currentQuestion.correctOptionId?.trim().toLowerCase();
    const isCorrect = selected === correct;

    if (isCorrect) {
      this.updateScore(); // Skoru artır
    }
    return selected === correct;
  }
  updateScore(): void {
    const extraPoints = this.counter.sec * 10; // Kalan süreye bağlı olarak ekstra puanı hesapla
    this._userService.updateScore(extraPoints); // Metodu doğru argümanla çağır
  }
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.resetState();
      this.startTimer();
      this.isStop = false;
    } else {
      this.isStop = false;
      this._router.navigate(['/result-page']); // Sonuç sayfasına yönlendirme
    }
  }
  lastQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.resetState();
    }
  }
  resetState(): void {
    this.selectedOptionId = null;
    this.isCorrect = false;
  }
  celebrate(): void {
    const end = Date.now() + 500;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 100,
        angle: Math.random() * 360,
        spread: 70,
        startVelocity: 30,
        decay: 0.9,
        scalar: 1.2,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 100);
  }
  startTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.counter = { min: 0, sec: 20 };
    this.intervalId = setInterval(() => {
      if (!this.isStop) {
        if (this.counter.sec - 1 === -1) {
          this.counter.min -= 1;
          this.counter.sec = 59;
        } else {
          this.counter.sec -= 1;
        }
        if (this.counter.min === 0 && this.counter.sec === 0) {
          clearInterval(this.intervalId);
        }
      }
    }, 1000);
  }
}
