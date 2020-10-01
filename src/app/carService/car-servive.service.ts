import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CarData } from '../shared/car-data';

@Injectable({
  providedIn: 'root'
})
export class CarServiveService {

  carData: CarData [] = [
    new CarData(
    '0',
    'Jack Lewis',
    'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
    '300 Alamo Plaza, San Antonio, TX 78205, United States',
    'MH1420110062821',
    'BC18351',
    'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
    'Almo',
    new Date(),
    new Date()),
    new CarData(
    '1',
    'Robart Brown',
    'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
    '300 Alamo Plaza, San Antonio, TX 78205, United States',
    'MH1420110062821',
    'BC18351',
    'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
    'Almo',
    new Date(),
    new Date()),
    new CarData(
    '2',
    'Nick Fury',
    'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
    '300 Alamo Plaza, San Antonio, TX 78205, United States',
    'MH1420110062821',
    'BC18351',
    'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
    'Almo',
    new Date(),
    new Date()),
    new CarData(
    '3',
    'Scarlet Klington',
    'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
    '300 Alamo Plaza, San Antonio, TX 78205, United States',
    'MH1420110062821',
    'BC18351',
    'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
    'Almo',
    new Date(),
    new Date()),
    new CarData(
      '4',
      'John Doe',
      'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
      '300 Alamo Plaza, San Antonio, TX 78205, United States',
      'MH1420110062821',
      'BC18351',
      'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
      'Almo',
      new Date(),
      new Date()),
      new CarData(
        '5',
        'Philip Huge',
        'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
        '300 Alamo Plaza, San Antonio, TX 78205, United States',
        'MH1420110062821',
        'BC18351',
        'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
        'Almo',
        new Date(),
        new Date()),
        new CarData(
          '6',
          'Kroos Gomez',
          'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
          '300 Alamo Plaza, San Antonio, TX 78205, United States',
          'MH1420110062821',
          'BC18351',
          'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
          'Almo',
          new Date(),
          new Date()),
          new CarData(
            '7',
            'Michel Johnson',
            'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
            '300 Alamo Plaza, San Antonio, TX 78205, United States',
            'MH1420110062821',
            'BC18351',
            'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
            'Almo',
            new Date(),
            new Date()),
            new CarData(
              '8',
              'Jhonny English',
              'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
              '300 Alamo Plaza, San Antonio, TX 78205, United States',
              'MH1420110062821',
              'BC18351',
              'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
              'Almo',
              new Date(),
              new Date()),
              new CarData(
                '9',
                'Philip Charles',
                'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
                '300 Alamo Plaza, San Antonio, TX 78205, United States',
                'MH1420110062821',
                'BC18351',
                'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
                'Almo',
                new Date(),
                new Date())
  ];

  getAllData() {
    return of<CarData []>([...this.carData]).pipe(take(1));
  }

  getUser(id: string) {
    return of<CarData> (...this.carData.filter(car => car.id === id)).pipe(take(1));
  }

  constructor() { }
}
