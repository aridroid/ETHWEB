import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { CarServiveService } from '../carService/car-servive.service';
import { ScreensizeService } from '../services/screensize.service';
import { CarData } from '../shared/car-data';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {
  isDesktop: boolean;
  searchArray: CarData[];
  @ViewChild('user') user;

  constructor(private platform: Platform,
              private screenSizeService: ScreensizeService,
              private http: HttpClient,
              private loadingCtrl: LoadingController,
              private carService: CarServiveService,
              private alertCtrl: AlertController) {
                this.screenSizeService.isDesktopView().subscribe(isDesktop => {
                  console.log('Is Desktop Changed:', isDesktop);
                  this.isDesktop = isDesktop;
                });
              }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.user.value){
      this.searchUser(this.user.value);
    }
    else {
      this.searchArray = [];
    }
  }

  onChange(event) {
    if (!event) {
      this.searchArray = [];
    }
  }

  searchUser(event) {
    this.loadingCtrl.create({
      message: 'Loading...'
    }).then(loadingEl => {
      loadingEl.present();
      this.carService.getSearchData(event).subscribe(resData => {
        this.searchArray = resData;
        loadingEl.dismiss();
        console.log(this.searchArray);
      },
      () => {
        loadingEl.dismiss();
        this.showErrorAlert(event);
      });
    });
  }

  showErrorAlert(userName: string) {
    this.alertCtrl.create({
      header: 'Connection Problem',
      message: 'Internet connection problem',
      buttons: [{
        text: 'Reload',
        handler: () => {
          this.searchUser(userName);
        }
      }]
    }).then(alertEl => alertEl.present());
  }

}