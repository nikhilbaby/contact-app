import { Injectable } from '@angular/core';
import {User} from "./profile/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs/Rx';
import {Email, NewUser} from "./contact/newuser.model";

@Injectable()
export class MainService {

  constructor(private http: HttpClient) { }

  updateUser(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/api/updateUsers', body, {headers: headers})
      .map((response) => response)
      .catch((error) => Observable.throw(error));
  }

  deleteUser(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/api/deleteUser', body, {headers: headers})
      .map((response) => response)
      .catch((error) => Observable.throw(error));
  }

  enrichContact(user: Email) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer G0WgUQDUApVczaNBIZ4itaXvxyY1AeZu'});
    return this.http.post('https://api.fullcontact.com/v3/person.enrich', body, {headers: headers})
      .map((response) => response)
      .catch((error) => Observable.throw(error));
  }

  addUser(user: NewUser) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('/api/addUser', body, {headers: headers})
      .map((response) => response)
      .catch((error) => Observable.throw(error));
  }
}
