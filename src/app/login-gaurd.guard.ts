import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { CarServiveService } from './carService/car-servive.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGaurd implements CanLoad {

  constructor(private carService: CarServiveService,
              private router: Router) {
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return from(this.carService.getLoginData()).pipe(take(1),
    switchMap((loginData: any) => {
      if (!loginData) {
        return of(false);
      }
      else {
        return of(true);
      }
    }),
    tap(status => {
      if (status === false){
        this.router.navigateByUrl('/login');
      }
    }));
  }
}
