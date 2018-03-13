import { GET_RECIPES_FOR_CUSTOMER, GET_RECIPES_FOR_COMPANY } from './../../constants/urls';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Recipe } from '../../models/recipe.model';
import { SET_RECIPE_URL } from '../../constants/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class RecipeService {

  constructor(
    private http: HttpClient
  ) { }

  setRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(SET_RECIPE_URL, recipe).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  getRecipesForCustomer(customerId): Observable<any> {
    return this.http.get(GET_RECIPES_FOR_CUSTOMER + '/' + customerId).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  getRecipesForCompany(): Observable<any> {
    return this.http.get(GET_RECIPES_FOR_COMPANY).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}
