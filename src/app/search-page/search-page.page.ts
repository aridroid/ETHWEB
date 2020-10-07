import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
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

  constructor(private platform: Platform,
              private screenSizeService: ScreensizeService,
              private http: HttpClient,
              private loadingCtrl: LoadingController,
              private carService: CarServiveService) {
                this.screenSizeService.isDesktopView().subscribe(isDesktop => {
                  console.log('Is Desktop Changed:', isDesktop);
                  this.isDesktop = isDesktop;
                });
              }

  ngOnInit() {
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
      });
    });
  }

}