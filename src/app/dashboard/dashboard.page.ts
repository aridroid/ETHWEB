import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarServiveService } from '../carService/car-servive.service';
import { ScreensizeService } from '../services/screensize.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  isDesktop: boolean;

  constructor(private screenSizeService: ScreensizeService,
              private router: Router,
              private carService: CarServiveService) {
    this.screenSizeService.isDesktopView().subscribe(isDesktop => {
      console.log('Is Desktop Changed:', isDesktop);
      this.isDesktop = isDesktop;
    });
 }

  ngOnInit() {
  }

  logout() {
    this.carService.clearLoginData();
    this.router.navigateByUrl('/login');
  }

}
