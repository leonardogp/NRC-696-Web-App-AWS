import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  identification: string = '';
  showResults: boolean = false; // Variable para controlar la visibilidad de los resultados

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    // No es necesario cargar usuarios automáticamente al inicio
  }

  searchUsers(): void {
    if (this.identification.trim()) {
      this.usersService.getUsersByIdentification(this.identification.trim())
        .subscribe(
          response => {
            console.log('Usuarios encontrados:', response);
            this.users = [];
            this.users = response; // Asigna los usuarios encontrados al arreglo local
            this.showResults = true; // Mostrar resultados después de la búsqueda
          },
          error => {
            console.error('Error al buscar usuarios:', error);
          }
        );
    } else {
      // Si el campo de búsqueda está vacío
      this.users = []; // Limpiar resultados si no se proporciona una identificación válida
      this.showResults = false; // Ocultar resultados si no hay búsqueda válida
    }
  }
}
