import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { CarServiveService } from '../carService/car-servive.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form: FormGroup;
  isBackButton: boolean;

  constructor(private carService: CarServiveService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      companyName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      })
    });
  }

  ionViewWillEnter() {
    this.isBackButton = false;
    from(this.carService.getLoginData()).subscribe(loginData => {
      if (!loginData) {
        this.isBackButton = true;
      }
      else {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  onSubmit() {
    this.loadingCtrl.create({
      message: 'Registering Process may take a while'
    }).then(loadinEl => {
      loadinEl.present();
      this.carService.signup(this.form.value).subscribe((resData: any) => {
        console.log(resData);
        if (resData.status === 'success') {
          this.form.reset();
          loadinEl.dismiss();
          this.carService.setLoginData(resData.userid, resData.company_name);
          this.alertCtrl.create({
            header: 'Success',
            message: 'The id and the password is sent to your email id, please check and use them to get login',
            buttons: [{
              text: 'Go to Login',
              handler: () => {
                this.router.navigateByUrl('/login');
              }
            }]
          }).then(alertEl => alertEl.present());
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
