import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  identificacion: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.identificacion, this.password).subscribe(success => {
      if (success) {
        this.errorMessage = null; 
      }
      else
      {
        this.errorMessage = 'Identificación o contraseña incorrectas';
      }
    });
  }
}
