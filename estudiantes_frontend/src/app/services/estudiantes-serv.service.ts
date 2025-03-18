import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Estudiante } from '../models/estudiante.model';
import { ResponseAPI } from '../models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesServService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Estudiantes";

  constructor() { }

  lista(){
    console.log(this.apiUrl)
    return this.http.get<ResponseAPI<Estudiante[]>>(this.apiUrl);

  }
  obtener(id:number){
    return this.http.get<ResponseAPI<Estudiante>>(`${this.apiUrl}/${id}`);
  }

  crear(objeto:Estudiante){
    return this.http.post<ResponseAPI<Estudiante>>(this.apiUrl,objeto);
  }

  editar(objeto:Estudiante){
    return this.http.put<ResponseAPI<Estudiante>>(`${this.apiUrl}/${objeto.id}`,objeto);
  }

  eliminar(id:number){
    return this.http.delete<ResponseAPI<Estudiante[]>>(`${this.apiUrl}/${id}`);
  }
}
