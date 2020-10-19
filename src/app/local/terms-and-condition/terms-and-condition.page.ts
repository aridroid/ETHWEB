import { Component, OnInit } from '@angular/core';
import { ScreensizeService } from '../../services/screensize.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.page.html',
  styleUrls: ['./terms-and-condition.page.scss'],
})
export class TermsAndConditionPage implements OnInit {

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
