import { Injectable } from '@angular/core';
import { Lista } from '../models/list.model';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  
  public listas:Lista[] = [];

  constructor() { 
    //console.log('Servicio Inicializado');
    this.LoadStorage();
    
    /*const Lista1 = new Lista('Lista1');
    const Lista2 = new Lista('Lista2');*/

    /*this.listas.push(Lista1,Lista2);*/
    //console.log(this.listas);
  }

  createList(titulo:string){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.SaveStorage();
  }

  SaveStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas) );
    console.log(this.listas);
  }
  
  LoadStorage(){
    if(localStorage.getItem('data') ){
      this.listas = JSON.parse(localStorage.getItem('data') );
    } else {
      this.listas = [];
    }
    
  }

}
