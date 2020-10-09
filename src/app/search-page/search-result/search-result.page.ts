import { Component, Input, OnInit } from '@angular/core';
import { CarData } from 'src/app/shared/car-data';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {

  @Input() carData: CarData[];
  imageUrl = 'http://eqsxerusrangoon.com/';

  constructor() { }

  ngOnInit() {
  }

}
