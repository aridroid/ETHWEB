import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CarServiveService } from 'src/app/carService/car-servive.service';
import { CarData } from 'src/app/shared/car-data';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  id: string;
  userData: CarData;
  imageUrl = 'http://ethexport.com/';
  companyId = null;
  isLoading = true;

  constructor(private activatedRoute: ActivatedRoute,
              private carService: CarServiveService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loadingCtrl.create({
      message: 'Loading...'
    }).then(loadingEl => {
      loadingEl.present();
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if (paramMap.has('id')){
          this.id = paramMap.get('id');
          this.carService.getUser(this.id).subscribe(resData => {
            console.log(resData);
            for (const key in resData){
              if (resData.hasOwnProperty(key)){
                this.userData = new CarData(
                  resData[key].id,
                  resData[key].name,
                  resData[key].drivingLicense,
                  resData[key].carNo,
                  resData[key].drivingPhoto,
                  resData[key].companyId,
                  resData[key].companyName,
                  resData[key].dateOfBooking,
                  resData[key].dateOfReturn,
                  resData[key].status
                );
              }
            }
            this.carService.getLoginData().then((storedData: any) => {
              this.companyId = storedData.companyId;
            });
            loadingEl.dismiss();
            this.isLoading = false;
          }, err => {
            loadingEl.dismiss();
            this.showErrorAlert();
          });
        }
      });
    });
  }

  showErrorAlert() {
    this.alertCtrl.create({
      header: 'Connection Problem',
      message: 'Internet connection problem',
      buttons: [{
        text: 'Reload',
        handler: () => {
          this.fetchData();
        }
      }]
    }).then(alertEl => alertEl.present());
  }

  updateStatus() {
    this.loadingCtrl.create({
      message: 'Updating Status...'
    }).then(loadingEl => {
      loadingEl.present();
      this.carService.uploadStatus(this.id).subscribe((resData: any) => {
        console.log(resData);
        if (resData.status === 'success') {
          loadingEl.dismiss();
          this.fetchData();
        }
        else {
          loadingEl.dismiss();
          this.alertCtrl.create({
            header: 'Failed',
            message: resData.message,
            buttons: ['Okay']
          }).then(alertEl => alertEl.present());
        }
      });
    });
  }

  onClick() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: "Once updating to delivered, you can't change it back to renting",
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Sure',
        handler: () => this.updateStatus()
      }]
    }).then(alertEl => alertEl.present());
  }

}
