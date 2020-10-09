import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CarServiveService } from '../carService/car-servive.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})
export class NewEntryPage implements OnInit {

  form: FormGroup;

  constructor(private carService: CarServiveService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.form = new FormGroup({
      carno: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      license: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(180)] 
      }),
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)]
      }),
      startdate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      enddate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }

  onImagePicked(imageData: string | File){
    let imageFile = imageData;
    this.form.patchValue({image: imageFile});
  }

  submitForm() {
    this.loadingCtrl.create({
      message: 'Uploading...'
    }).then(loadingEl => {
      loadingEl.present();
      this.carService.uploadUserDetails(this.form.value).subscribe((resData:any) => {
        if (resData.status === 'success') {
          loadingEl.dismiss();
          this.router.navigateByUrl('/dashboard');
          this.form.reset();
        }
        else {
          loadingEl.dismiss();
          this.alertCtrl.create({
            header: 'Failure',
            message: resData.massage,
            buttons: ['Okay']
          }).then(alertEl => alertEl.present());
        }
      }, () => {
        loadingEl.dismiss();
        this.alertCtrl.create({
          header: 'Connection Failed',
          message: 'Failed to establish connection with the server',
          buttons: ['Okay']
        }).then(alertEl => alertEl.present());
      });
    });
  }

}
