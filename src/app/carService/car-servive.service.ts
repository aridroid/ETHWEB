import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { CarData } from '../shared/car-data';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CarServiveService {

  carData: CarData[] = [];
  searchData: CarData[] = [];

  getSearchData(name: string) {
    let formData = new FormData();
    formData.append('name', name);
    return this.http.post<{ [key: string]: CarData }>('http://eqsxerusrangoon.com/eth/get-users-by-name.php', formData).pipe(take(1),
    switchMap(resData => {
      this.carData = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
            this.carData.push(new CarData(
            resData[key].id,
            resData[key].name,
            resData[key].drivingLicense,
            resData[key].carNo,
            resData[key].drivingPhoto,
            resData[key].companyId,
            resData[key].companyName,
            resData[key].dateOfBooking,
            resData[key].dateOfReturn,
            resData[key].status));
        }
      }
      return of(this.carData);
    }));
  }

  getAllData() {
    return this.http.get<{ [key: string]: CarData }>('http://eqsxerusrangoon.com/eth/get-all-user.php').pipe(take(1),
    switchMap(resData => {
      this.carData = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
            this.carData.push(new CarData(
            resData[key].id,
            resData[key].name,
            resData[key].drivingLicense,
            resData[key].carNo,
            resData[key].drivingPhoto,
            resData[key].companyId,
            resData[key].companyName,
            resData[key].dateOfBooking,
            resData[key].dateOfReturn,
            resData[key].status));
        }
      }
      return of(this.carData);
    }));
  }

  getAllActiveData() {
    return this.http.get<{ [key: string]: CarData }>('http://eqsxerusrangoon.com/eth/get-all-active-user.php').pipe(take(1),
    switchMap(resData => {
      this.carData = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
            this.carData.push(new CarData(
            resData[key].id,
            resData[key].name,
            resData[key].drivingLicense,
            resData[key].carNo,
            resData[key].drivingPhoto,
            resData[key].companyId,
            resData[key].companyName,
            resData[key].dateOfBooking,
            resData[key].dateOfReturn,
            resData[key].status));
        }
      }
      return of(this.carData);
    }));
  }

  getAllInactiveData() {
    return this.http.get<{ [key: string]: CarData }>('http://eqsxerusrangoon.com/eth/get-all-inactive-user.php').pipe(take(1),
    switchMap(resData => {
      this.carData = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
            this.carData.push(new CarData(
            resData[key].id,
            resData[key].name,
            resData[key].drivingLicense,
            resData[key].carNo,
            resData[key].drivingPhoto,
            resData[key].companyId,
            resData[key].companyName,
            resData[key].dateOfBooking,
            resData[key].dateOfReturn,
            resData[key].status));
        }
      }
      return of(this.carData);
    }));
  }

  getUser(id: string) {
    return this.http.get<{ [key: string]: CarData }>(`http://eqsxerusrangoon.com/eth/get-user-by-id.php?id=${id}`).pipe(take(1));
  }

  signup(formValue: any) {
    let signUpData = new FormData();
    signUpData.append('companyname', formValue.companyName);
    signUpData.append('address', formValue.address);
    signUpData.append('email', formValue.email);
    console.log(signUpData);
    return this.http.post('http://eqsxerusrangoon.com/eth/signup.php', signUpData).pipe(take(1));
  }

  login(formValue: any) {
    console.log(formValue); 
    let signUpData = new FormData();
    signUpData.append('username', formValue.username);
    signUpData.append('password', formValue.password);
    console.log(signUpData);
    return this.http.post('http://eqsxerusrangoon.com/eth/login.php', signUpData).pipe(take(1));
  }

  async setLoginData(userId: string, company_name: string) {
    await Storage.set({
      key: 'userData',
      value: JSON.stringify({
        companyId: userId,
        companyName: company_name
      })
    });
  }

  async getLoginData() {
    let userData = await Storage.get({key: 'userData'});
    userData = JSON.parse(userData.value);
    return userData;
  }

  async clearLoginData() {
    await Storage.remove({ key: 'userData' });
  }

  uploadUserDetails(formValue: any) {
    console.log(formValue);
    let userDetails = new FormData();
    userDetails.append('car_no', formValue.carno);
    userDetails.append('license', formValue.license);
    userDetails.append('name', formValue.name);
    userDetails.append('startdate', formValue.startdate);
    userDetails.append('enddate', formValue.enddate); 
    userDetails.append('image', formValue.image);
    // console.log('type: ' + typeof(userDetails.get('image')), userDetails.get('image'));
    return from(this.getLoginData()).pipe(switchMap((resData: any) => {
      userDetails.append('company_id', resData.companyId);
      userDetails.append('company_name', resData.companyName);
      return this.http.post('http://eqsxerusrangoon.com/eth/upload-user-details.php', userDetails)
      .pipe(take(1));
    }));
  }

  uploadStatus(id: string) {
    let formData = new FormData();
    formData.append('id', id);
    return this.http.post(`http://eqsxerusrangoon.com/eth/update-status.php`, formData).pipe(take(1));
  }

  constructor(private http: HttpClient) { }
}

// [
//   new CarData(
//   '0',
//   'Jack Lewis',
//   'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//   '300 Alamo Plaza, San Antonio, TX 78205, United States',
//   'MH1420110062821',
//   'BC18351',
//   'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//   'Almo',
//   new Date(),
//   new Date()),
//   new CarData(
//   '1',
//   'Robart Brown',
//   'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//   '300 Alamo Plaza, San Antonio, TX 78205, United States',
//   'MH1420110062821',
//   'BC18351',
//   'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//   'Almo',
//   new Date(),
//   new Date()),
//   new CarData(
//   '2',
//   'Nick Fury',
//   'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//   '300 Alamo Plaza, San Antonio, TX 78205, United States',
//   'MH1420110062821',
//   'BC18351',
//   'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//   'Almo',
//   new Date(),
//   new Date()),
//   new CarData(
//   '3',
//   'Scarlet Klington',
//   'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//   '300 Alamo Plaza, San Antonio, TX 78205, United States',
//   'MH1420110062821',
//   'BC18351',
//   'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//   'Almo',
//   new Date(),
//   new Date()),
//   new CarData(
//     '4',
//     'John Doe',
//     'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//     '300 Alamo Plaza, San Antonio, TX 78205, United States',
//     'MH1420110062821',
//     'BC18351',
//     'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//     'Almo',
//     new Date(),
//     new Date()),
//     new CarData(
//       '5',
//       'Philip Huge',
//       'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//       '300 Alamo Plaza, San Antonio, TX 78205, United States',
//       'MH1420110062821',
//       'BC18351',
//       'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//       'Almo',
//       new Date(),
//       new Date()),
//       new CarData(
//         '6',
//         'Kroos Gomez',
//         'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//         '300 Alamo Plaza, San Antonio, TX 78205, United States',
//         'MH1420110062821',
//         'BC18351',
//         'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//         'Almo',
//         new Date(),
//         new Date()),
//         new CarData(
//           '7',
//           'Michel Johnson',
//           'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//           '300 Alamo Plaza, San Antonio, TX 78205, United States',
//           'MH1420110062821',
//           'BC18351',
//           'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//           'Almo',
//           new Date(),
//           new Date()),
//           new CarData(
//             '8',
//             'Jhonny English',
//             'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//             '300 Alamo Plaza, San Antonio, TX 78205, United States',
//             'MH1420110062821',
//             'BC18351',
//             'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//             'Almo',
//             new Date(),
//             new Date()),
//             new CarData(
//               '9',
//               'Philip Charles',
//               'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png',
//               '300 Alamo Plaza, San Antonio, TX 78205, United States',
//               'MH1420110062821',
//               'BC18351',
//               'https://www.picturando.com/fake/driver-license/img/usa-driver-license_th.jpg',
//               'Almo',
//               new Date(),
//               new Date())
// ];