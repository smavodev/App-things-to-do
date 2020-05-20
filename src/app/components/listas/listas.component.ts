import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor( public _deseosService: DeseosService,
               private _router: Router,
               private _alertCtrl: AlertController ) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {

    if ( this.terminada ) {
      this._router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this._router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }

  }

  borrarLista( lista: Lista ) {
    this._deseosService.deleteList( lista );
  }

  async editarLista( lista: Lista ) {

    const alert = await this._alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            //console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            }

            lista.titulo = data.titulo;
            this._deseosService.SaveStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();


  }

}
