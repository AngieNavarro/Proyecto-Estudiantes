import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { EstudianteComponent } from './components/registro/estudiante.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'Estudiantes/:id', component: EstudianteComponent },
];
