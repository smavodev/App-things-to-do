import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public _deseosService: DeseosService,
    private _router: Router,
    private _alertCtrl: AlertController) {

  }

  async addList() {
    //this._router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this._alertCtrl.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la Lista'
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text:'Crear',
          handler: (data) => {
            console.log(data);
            if(data.titulo.length===0){
              return;
            }

            this._deseosService.createList(data.titulo);

            //Crear lista
            

          }
        }
      ]
    });
    alert.present();
  }


}
