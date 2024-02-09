import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobilezoneMiddlewareApiService {
  http: HttpClient = inject(HttpClient);
  apiRoot = "https://middleware.production.nm.mobilezone.org/api/"
  search = "search"
  bundles = "bundles"

  headers = {
      'content-type': 'application/json',
      'Appname': 'deinhandy',
      'Accept': '*/*'
  }

  constructor() { }

  preparePost(filter: any) {
    const body = JSON.stringify(filter);
    return body
  }

  getAllSmartphones(filter: any): Observable<any> {
    const body = this.preparePost(filter)
    return this.http.post(this.apiRoot + this.search, body, {headers: this.headers, responseType: 'json'});
  }

  getAllSmartphoneProducts(filter: any) {
    const body = JSON.stringify(filter);
    return this.http.post(this.apiRoot + this.bundles, body, {headers: this.headers, responseType: 'json'});
  }
}
