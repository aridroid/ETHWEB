import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CarServiveService } from '../carService/car-servive.service';
import { ScreensizeService } from '../services/screensize.service';
import { CarData } from '../shared/car-data'; 


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

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
      this.carService.getAllActiveData().subscribe(resData => {
        this.arr = resData
        this.isLoading = false;
        loadingEl.dismiss();
      }, err => {
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

//needed when api call will be done

// this.http.get(`https://randomuser.me/api/?results=50&page=${this.page}`)
// .subscribe(res => {
//   this.loadingCtrl.create({
//     message: 'Loading...'
//   }).then(loadingEl => {
//     loadingEl.present();
//     this.arr = this.arr.concat(res['results']);
//     // console.log(this.arr);
//     loadingEl.dismiss();
//   });
//   if (event) {
//     event.target.complete();
//   }
//   else {
//     this.isLoading = false;
//   }
// });

// loadMore(event) {
  //   console.log(event);
  //   this.page++;
  //   this.loadUsers(event);
  // }

