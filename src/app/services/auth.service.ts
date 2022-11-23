import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL ='http://localhost:4000';
  constructor(private http: HttpClient) { }

  getData(user):Observable<any> {
    return this.http.post<any>(this.apiURL+'/signup', user);
  }

  


}
