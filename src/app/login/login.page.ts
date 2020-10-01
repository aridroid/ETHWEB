import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ForgetPasswordComponent } from '../local/forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  openModal() {
    this.modalCtrl.create({
      component: ForgetPasswordComponent
    }).then(modalEl => {
      modalEl.present();
      modalEl.onDidDismiss().then(closingData => {
        console.log(closingData.data, closingData.role);
      });
    });
  }

}
