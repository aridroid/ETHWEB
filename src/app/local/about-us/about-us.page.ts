import { Component, OnInit } from '@angular/core';
import { ScreensizeService } from '../../services/screensize.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

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
