import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  public lista: Lista;
  public nombreItem: '';

  constructor(private _deseosService: DeseosService,
    private _route: ActivatedRoute) {

    const listaId = this._route.snapshot.paramMap.get('listaId');
    //console.log(listaId);

    this.lista = this._deseosService.obtenerLista(listaId);
    //console.log(this.listas);
  }


  ngOnInit() {
  }

  addItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    //console.log(this.nombreItem);
    this.nombreItem = '';
    this._deseosService.SaveStorage();
  }

  cambioCheck(item: ListaItem) {
    //console.log(item);
    const pendientes = this.lista.items.filter(itemData => {
      return !itemData.completado;
    }).length;
    //console.log('pendientes', pendientes);

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this._deseosService.SaveStorage();
    //console.log(this._deseosService.listas);
  }

  delete(i: number){
    this.lista.items.splice(i, 1);
    this._deseosService.SaveStorage();
    //console.log(this.lista.items);
  }

}
