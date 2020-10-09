import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CarServiveService } from '../carService/car-servive.service';
import { ForgetPasswordComponent } from '../local/forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(private modalCtrl: ModalController,
              private carService: CarServiveService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
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

  onSubmit() {
    this.loadingCtrl.create({
      message: 'Loading'
    }).then(loadinEl => {
      loadinEl.present();
      this.carService.login(this.form.value).subscribe((resData: any) => {
        console.log(resData);
        if (resData.status === 'success') {
          this.form.reset();
          this.carService.setLoginData(resData.userid, resData.company_name);
          loadinEl.dismiss();
          this.router.navigateByUrl('/dashboard');
        }
        else { 
          loadinEl.dismiss();
          this.form.reset();
          this.alertCtrl.create({
            header: 'Registration Failed',
            message: resData.massage,
            buttons: ['Okay']
          }).then(alertEl => alertEl.present());
        }
      }, err => {
        loadinEl.dismiss();
        this.form.reset();
        this.alertCtrl.create({
          header: 'Connection Failed',
          message: 'Failed to establish connection with the server',
          buttons: ['Okay']
        }).then(alertEl => alertEl.present());
        console.log(err);
      });
    });
  }

}
