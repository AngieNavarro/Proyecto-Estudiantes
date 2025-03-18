import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EstudiantesServService } from '../../services/estudiantes-serv.service'
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-estudiante',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit {

  idEstudiante!: number;
  private empleadoServicio = inject(EstudiantesServService);
  public formBuild = inject(FormBuilder);
  public errores: string[] = []; // Almacenar los errores de validación
  public listaEstudiante: Estudiante[] = [];
  public nombre_boton: string = "Guardar";
  public mensaje: string = "";


  public formEstudiante: FormGroup = this.formBuild.group({
    nombre: [''],
    apellidos: [''],
    documento: [''],
    edad: [0],
    genero: [''],
    celular: [''],
    correo: [''],
    curso: ['']
  });

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idEstudiante = Number(params['id']);
    });
    if (this.idEstudiante != 0) {
      this.nombre_boton = "Actualizar";
      this.empleadoServicio.obtener(this.idEstudiante).subscribe({
        next: (data) => {
          if (data.result) {
            setTimeout(() => {
              this.formEstudiante.patchValue({
                nombre: data.result.nombre,
                apellidos: data.result.apellidos,
                documento: data.result.documento,
                edad: data.result.edad,
                genero: data.result.genero,
                celular: data.result.celular,
                correo: data.result.correo,
                curso: data.result.curso
              });
            }, 0);
            console.log("Formulario actualizado:", this.formEstudiante.value); // Debug

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
      })
    }
  }

  guardar() {
    this.errores = []; // Limpiar errores anteriores

    let objeto: any = {
      nombre: this.formEstudiante.value.nombre,
      apellidos: this.formEstudiante.value.apellidos,
      documento: this.formEstudiante.value.documento,
      edad: this.formEstudiante.value.edad,
      genero: this.formEstudiante.value.genero,
      celular: this.formEstudiante.value.celular,
      correo: this.formEstudiante.value.correo,
      curso: this.formEstudiante.value.curso
    };

    if (this.idEstudiante !== 0) {
      objeto.id = this.idEstudiante;
    }

    const servicio = this.idEstudiante === 0 ?
      this.empleadoServicio.crear(objeto) :
      this.empleadoServicio.editar(objeto);

    servicio.subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.mensaje = "Modificación exitosa!"
          // Espera 2 segundos (2000 milisegundos) antes de navegar
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);

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
  }

  volver() {
    this.router.navigate(["/"]);
  }


}

