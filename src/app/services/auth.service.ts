import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(matricule: string): void {
    localStorage.setItem('matricule', matricule);
  }

  logout(): void {
    localStorage.removeItem('matricule');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('matricule') !== null;
  }

  getMatricule(): string | null {
    return localStorage.getItem('matricule');
  }
}
