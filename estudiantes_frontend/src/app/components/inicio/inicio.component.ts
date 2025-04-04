import { Estudiante } from './../../models/estudiante.model';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { EstudiantesServService } from '../../services/estudiantes-serv.service';
import { CommonModule } from '@angular/common';
// Importar Bootstrap
declare var bootstrap: any; // Para usar Bootstrap nativo
// Importa bootstrap para usar su API de Toast
@Component({
  selector: 'app-inicio',
  imports: [RouterModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private EstudianteServicio = inject(EstudiantesServService);
  public listaEstudiante: Estudiante[] = [];
  public displayedColumns: string[] = ['nombre', 'documento', 'edad', 'genero', 'telefono', 'correo', 'curso'];
  public mensaje: string = "";
  public tipoMensaje: string = ""; // "success" o "danger"
  estudianteAEliminar: Estudiante | null = null;
  public errores: string[] = [];


  obtenerEmpleados() {

    this.EstudianteServicio.lista().subscribe({
      next: (response) => {
        if (response.isSuccess && response.result.length > 0) {
          this.listaEstudiante = response.result; // Extraemos "result"
        } else {
          console.log('No hay estudiantes disponibles');
        }
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err.message);
      }
    });
  }


  constructor(private router: Router) {

    this.obtenerEmpleados();
  }

  nuevo() {
    this.router.navigate(['/Estudiantes', 0]);
  }

  editar(objeto: Estudiante) {
    this.router.navigate(['/Estudiantes', objeto.id]);
  }

  eliminar(objeto: Estudiante) {
    this.estudianteAEliminar = objeto;

    // Muestra el modal de Bootstrap
    let modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    modal.show();
  }

  confirmarEliminacion() {
    if (!this.estudianteAEliminar) return;

    this.EstudianteServicio.eliminar(this.estudianteAEliminar.id).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.obtenerEmpleados();
          // Actualiza el contenido del toast con el nombre del estudiante
          const toastBody = document.querySelector('#eliminacionToast .toast-body');
          if (toastBody) {
            // Actualiza el mensaje; también puedes actualizar el <span id="nombreToast"> si lo prefieres.
            toastBody.textContent = `Estudiante ${this.estudianteAEliminar!.nombre} eliminado correctamente.`;
          }
          // Obtén el elemento toast y muestra el toast
          const toastEl = document.getElementById('eliminacionToast');
          if (toastEl) {
            const toastInstance = new bootstrap.Toast(toastEl);
            toastInstance.show();
          }
          // Opcional: refresca la lista o redirige a otra página
          // this.router.navigate(['/']);
        } else {
          this.errores.push("Error al procesar la solicitud.");
        }
      },
      error: (err) => {
        console.error("Error en la solicitud:", err);
        if (err.error && err.error.errors) {
          for (let campo in err.error.errors) {
            this.errores.push(`${campo}: ${err.error.errors[campo].join(', ')}`);
          }
        } else {
          this.errores.push("Ocurrió un error inesperado.");
        }
      }
    });
    // Ocultar el modal después de confirmar
    let modal = bootstrap.Modal.getInstance(document.getElementById('confirmacionModal'));
    modal.hide();
  }



}
