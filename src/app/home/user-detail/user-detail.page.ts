import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarServiveService } from 'src/app/carService/car-servive.service';
import { CarData } from 'src/app/shared/car-data';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  id: string;
  userData: CarData;

  constructor(private activatedRoute: ActivatedRoute,
              private carService: CarServiveService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')){
        this.id = paramMap.get('id');
        console.log(this.id);
        this.carService.getUser(this.id).subscribe(user => this.userData = user);
      }
    });
  }

}
