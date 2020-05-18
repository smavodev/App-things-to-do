import { Injectable } from '@angular/core';
import { Lista } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  
  public listas:Lista[] = [];

  constructor() { 
    //console.log('Servicio Inicializado');
    const Lista1 = new Lista('Lista1');
    const Lista2 = new Lista('Lista2');

    this.listas.push(Lista1,Lista2);
    //console.log(this.listas);

    
  }

}
