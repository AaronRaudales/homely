import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL ='https://homely-back.herokuapp.com';
  constructor(private http: HttpClient) { }

  getData(user):Observable<any> {
    return this.http.post<any>(this.apiURL+'/signup', user);
  }

  


}
