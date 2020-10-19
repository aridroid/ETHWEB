import { Component, OnInit } from '@angular/core';
import { ScreensizeService } from '../../services/screensize.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

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
