import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GET_COUNTRIES_URL } from '../../constants/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<any> {
    return this.http.get(GET_COUNTRIES_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getCountryByName(countryName) {
    return this.http.get(GET_COUNTRIES_URL).map((res: any) => {
      return res.filter(country => country.name === countryName)[0];
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }
}
