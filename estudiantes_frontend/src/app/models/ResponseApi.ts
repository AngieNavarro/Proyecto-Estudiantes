import { Estudiante } from "./estudiante.model";

export interface ResponseAPI<T>{
  isSuccess:boolean;
  message:string;
  result:T
}
