// Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ErrorPageComponent } from './components/errors/error-page/error-page.component';
import { HomeComponent } from './components/layouts/body/home/home.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { MembersComponent } from './components/members/members.component';
import { RecipeListComponent } from './components/layouts/body/recipe-list/recipe-list.component';
import { AccountComponent } from './components/layouts/body/account/account.component';
import { CustomerDetailsComponent } from './components/layouts/body/customer-details/customer-details.component';
import { CustomerListComponent } from './components/layouts/body/customer-list/customer-list.component';

// Guards
import { AuthGuard } from './guards/auth/auth.guard';

const appRoutes: Routes = [
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard], children: [
    {
      path: '', component: HomeComponent, canActivate: [AuthGuard]
    },
    {
      path: 'recipes', component: RecipeListComponent, canActivate: [AuthGuard]
    },
    {
      path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard]
    },
    {
      path: 'customers/:name', component: CustomerDetailsComponent, canActivate: [AuthGuard]
    },
    {
      path: 'account', component: AccountComponent, canActivate: [AuthGuard]
    }
  ]},
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path:  '', redirectTo: 'members', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

const appRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [
    appRouter
  ]
})
export class RoutingModule { }
