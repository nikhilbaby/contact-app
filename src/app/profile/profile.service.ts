import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "./user.model";

@Injectable()
export class ProfileService implements Resolve<any>{
  widgets: any;
  routeParams: any;

  constructor(private http: HttpClient) {
  }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      this.routeParams = route.params;

      Promise.all([
        this.getWidgets()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getWidgets(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get('api/getUsers/' + this.routeParams.id)
        .subscribe((response: any) => {
          // console.log(response);
          this.widgets = response;
          resolve(response);
        }, reject);
    });
  }

}
