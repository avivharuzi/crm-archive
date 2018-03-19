// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { LoadingModule } from './modules/loading/loading.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { BodyComponent } from './components/layouts/body/body.component';
import { RecipeListComponent } from './components/layouts/body/recipe-list/recipe-list.component';
import { AccountComponent } from './components/layouts/body/account/account.component';
import { HomeComponent } from './components/layouts/body/home/home.component';
import { ErrorPageComponent } from './components/errors/error-page/error-page.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { MembersComponent } from './components/members/members.component';
import { CustomerListComponent } from './components/layouts/body/customer-list/customer-list.component';
import { CustomerItemComponent } from './components/layouts/body/customer-list/customer-item/customer-item.component';
import { CustomerDetailsComponent } from './components/layouts/body/customer-details/customer-details.component';
import { ErrorFormComponent } from './components/errors/error-form/error-form.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RecipesTableComponent } from './components/tables/recipes-table/recipes-table.component';
import { AddCustomerFormComponent } from './components/forms/add-customer-form/add-customer-form.component';
import { RecipeFormComponent } from './components/forms/recipe-form/recipe-form.component';

// Services
import { CountryService } from './services/country/country.service';
import { CompanyService } from './services/company/company.service';
import { ValidationService } from './services/validation/validation.service';
import { AuthService } from './services/auth/auth.service';
import { RecipeService } from './services/recipe/recipe.service';

// Pipes
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';

// Interceptors
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';

// Guards
import { AuthGuard } from './guards/auth/auth.guard';
import { SearchPipe } from './pipes/search/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    RecipeListComponent,
    AccountComponent,
    HomeComponent,
    ErrorPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    MembersComponent,
    ErrorFormComponent,
    CapitalizePipe,
    CustomerListComponent,
    CustomerItemComponent,
    CustomerDetailsComponent,
    MessagesComponent,
    RecipesTableComponent,
    AddCustomerFormComponent,
    RecipeFormComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    RouterModule,
    NgProgressModule.forRoot(),
    NgProgressRouterModule,
    HttpClientModule,
    LoadingModule.forRoot()
  ],
  providers: [
    CountryService,
    CompanyService,
    ValidationService,
    RecipeService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
