import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'onCancel');
  }

}
