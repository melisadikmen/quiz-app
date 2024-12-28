import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [CommonModule, CardModule, MatButtonModule],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.scss'
})
export class ResultPageComponent {
  users: { email: string; puan: number }[] = [];
  constructor(private _userService: UserService, private _router: Router) { }
  ngOnInit(): void {
    this.users = this._userService.getAllUsers(); // Tüm kullanıcıları al
  }
  backHome() {
    this._router.navigate(['/home']);
  }
  backLogin() {
    this._router.navigate(['/login']);
  }
}
