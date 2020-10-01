import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { CarServiveService } from '../carService/car-servive.service';
import { ScreensizeService } from '../services/screensize.service';
import { CarData } from '../shared/car-data';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  isDesktop: boolean;
  arr: CarData[];
  page = 0;
  isLoading = true;
  isSearching = false;
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
    this.loadUsers();
  }

  loadUsers(event?) {

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

    this.carService.getAllData()
    .subscribe(res => {
        this.loadingCtrl.create({
        message: 'Loading...'
      }).then(loadingEl => {
        loadingEl.present();
        this.arr = res;
        console.log(this.arr);
        // console.log(this.arr[0].name);
        loadingEl.dismiss();
        this.isLoading = false;
      });
    });
    }

  loadMore(event) {
    console.log(event);
    this.page++;
    this.loadUsers(event);
  }

  searchUser(event) {
    if (event.value) {
      this.isSearching = true;
      this.searchArray = this.arr.filter(user => {
        let str = user.name.toLowerCase();
        if(str.includes(event.value.toLowerCase())) {
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

}
