import { Component, HostListener } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreensizeService } from './services/screensize.service';
import { Location } from '@angular/common';
import { CarServiveService } from './carService/car-servive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenSizeService: ScreensizeService,
    private alertController: AlertController,
    private _location: Location,
    private carService: CarServiveService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screenSizeService.onResize(this.platform.width());
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/login') || (this._location.isCurrentPathEqualTo('/dashboard'))) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this._location.back();

      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          r.dismiss();
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      });
    });

  }

  showExitConfirm() {
    this.alertController.create({
      header: 'Confirmation',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

  logout() {
    this.carService.clearLoginData();
    this.router.navigateByUrl('/login');
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screenSizeService.onResize(event.target.innerWidth);
  }
}
