// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(identificacion: string, password: string): Observable<boolean> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/login`, { identificacion, password })
      .pipe(
        map(response => {
          this.loggedIn = true;
          this.router.navigate(['/users']);
          return true;
        }),
        catchError(error => {
          console.error('Login error:', error);
          return of(false);
        })
      );
  }

  logout(): void {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
