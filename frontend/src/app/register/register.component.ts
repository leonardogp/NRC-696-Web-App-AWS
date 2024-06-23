import { Component } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};
  registered: boolean = false; // Bandera para mostrar mensaje de registro exitoso

  constructor(private registerService: RegisterService) { }

  register(): void {
    this.registerService.registerUser(this.user)
      .subscribe(
        response => {
          console.log('Usuario registrado correctamente:', response);
          this.registered = true; // Muestra el mensaje de registro exitoso
          setTimeout(() => {
            this.registerService.redirectToIndex(); // Redirige al índice después de un registro exitoso
          }, 1000); // Espera 1 segundo antes de redirigir
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
  }
}
