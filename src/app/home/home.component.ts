import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private _router: Router) { }
  openComponent() {
    this._router.navigate(["/page1"]);
  }
  openPage2() {
    this._router.navigate(["/page2"]);
  }
  openPage3() {
    this._router.navigate(["/page3"]);
  }
  openPage4() {
    this._router.navigate(["/page4"]);
  }
}
