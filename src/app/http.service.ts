import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'applicaton/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  sendMail(obj) {
    return this.http.post(this.url+'sendMail', obj);
  }

}
