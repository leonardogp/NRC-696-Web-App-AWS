import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/register'; // URL del backend

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // Método para redirigir al índice después de un registro exitoso
  redirectToIndex() {
    this.router.navigate(['/']);
  }
}
