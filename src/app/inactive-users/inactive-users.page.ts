import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CarServiveService } from '../carService/car-servive.service';
import { ScreensizeService } from '../services/screensize.service';
import { CarData } from '../shared/car-data';


@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.page.html',
  styleUrls: ['./inactive-users.page.scss'],
})

export class InactiveUsersPage implements OnInit{

  subscription: Subscription;
  isDesktop: boolean;
  arr: CarData[];
  page = 0;
  isLoading = true;
  isSearching = false;
  searchArray: CarData[];
  imageUrl = 'http://ethexport.com/';

  constructor(private platform: Platform,
              private screenSizeService: ScreensizeService,
              private http: HttpClient,
              private loadingCtrl: LoadingController,
              private carService: CarServiveService,
              private alertCtrl: AlertController,
              private router: Router) {
                this.screenSizeService.isDesktopView().subscribe(isDesktop => {
                  console.log('Is Desktop Changed:', isDesktop);
                  this.isDesktop = isDesktop;
                });
              }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadUsers();
  }

  loadUsers(event?) {
    this.loadingCtrl.create({
      message: 'Loading...'
    }).then(loadingEl => {
      loadingEl.present();
      this.carService.getAllInactiveData().subscribe(resData => {
        this.arr = resData
        this.isLoading = false;
        loadingEl.dismiss();
      }, () => {
        loadingEl.dismiss();
        this.showErrorAlert();
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
          this.loadUsers();
        }
      }]
    }).then(alertEl => alertEl.present());
  }

  searchUser(event) {
    if (event.value) {
      this.isSearching = true;
      this.searchArray = this.arr.filter(user => {
        let str = user.name.toLowerCase();
        if (str.includes(event.value.toLowerCase())) {
          return user;
        }
      });
    }
    else {
      this.isSearching = false;
    }
    console.log('User input: ' + event.value);
    console.log(this.searchArray);
  }

  logout() {
    this.carService.clearLoginData();
    this.router.navigateByUrl('/login');
  }

}