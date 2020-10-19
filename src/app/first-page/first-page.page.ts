import { Component, OnInit } from '@angular/core';
import { ScreensizeService } from '../services/screensize.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {

  isDesktop: boolean;

  constructor(private screenSizeService: ScreensizeService) {
    this.screenSizeService.isDesktopView().subscribe(isDesktop => {
      console.log('Is Desktop Changed:', isDesktop);
      this.isDesktop = isDesktop;
    });
   }

  ngOnInit() {
  }

}
