import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../../models/company.model';
import {
  BASE_COMPANY_URL,
  GET_COMPANIES_WITHOUT_CURRENT,
  GET_COMPANY_CUSTOMER_DETAILS,
  GET_COMPANY_CUSTOMERS,
  SET_COMPANY_CUSTOMER,
  SET_COMPANY_URL,
} from './../../constants/urls';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  setCompany(company: Company): Observable<any> {
    const fd: FormData = new FormData();

    for (let key in company) {
      if (company.hasOwnProperty(key)) {
        fd.append(key, company[key]);
      }
    }

    return this.http.post(SET_COMPANY_URL, fd).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  getCompanyDetails(): Observable<any> {
    return this.http.get(BASE_COMPANY_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  getCompaniesWithoutCurrent(): Observable<any> {
    return this.http.get(GET_COMPANIES_WITHOUT_CURRENT).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  setCompanyCustomer(customerId: string): Observable<any> {
    return this.http.put(SET_COMPANY_CUSTOMER, { customerId: customerId }).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  getCompanyCustomers(): Observable<any> {
    return this.http.get(GET_COMPANY_CUSTOMERS).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  getCompanyCustomerDetails(customerName: string): Observable<any> {
    return this.http.get(GET_COMPANY_CUSTOMER_DETAILS + '/' + customerName).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}
