import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: { email: string; puan: number }[] = [];
  private currentUserEmail: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadUsers(); // Kullanıcıları yükle
  }
  setCurrentUser(email: string): void {
    this.currentUserEmail = email;

    // Kullanıcı daha önce eklenmediyse ekle
    if (!this.users.find(user => user.email === email)) {
      this.users.push({ email, puan: 0 });
      this.saveUsers();
    }
  }
  getCurrentUser(): { email: string; puan: number } | undefined {
    return this.users.find(user => user.email === this.currentUserEmail);
  }
  updateScore(extraPoints: number): void {
    const user = this.getCurrentUser();
    if (user) {
      user.puan += extraPoints; // Skoru kalan süreye bağlı olarak artır
      this.saveUsers();
    }
  }

  getAllUsers(): { email: string; puan: number }[] {
    return this.users;
  }
  private saveUsers(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Sadece tarayıcı ortamında çalıştır
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  private loadUsers(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Sadece tarayıcı ortamında çalıştır
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }
    }
  }
}
