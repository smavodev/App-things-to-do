import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  
  listas:Lista[] = [];

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
    return nuevaLista.id;
  }

  SaveStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas) );
    //console.log(this.listas);
  }
  
  obtenerLista( id: string | number){
    id =  Number(id);
    return this.listas.find( listData => {
        return listData.id === id;
    });
  }

  LoadStorage(){
    if(localStorage.getItem('data') ){
      this.listas = JSON.parse(localStorage.getItem('data') );
    } else {
      this.listas = [];
    }
    
  }

  deleteList( lista: Lista ) {

    this.listas = this.listas.filter( listaData => listaData.id !== lista.id );

    this.SaveStorage();

  }

}
