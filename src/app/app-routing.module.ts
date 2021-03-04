import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardviewComponent } from './catCards/catCard.component';
import { FAQComponent } from './faq/faq.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactUsComponent } from './contactUs/contactUs.component';
import { CatcreateComponent } from './createCat/createCat.component';
import { AuthGuard } from './shared/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { CateditComponent } from './editCat/editCat.component';

// need to add https://angular.io/api/router/CanActivate

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'home', pathMatch: 'full', component: HomepageComponent },
  { path: 'faq', pathMatch: 'full', component: FAQComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'signup', pathMatch: 'full', component: SignupComponent },
  { path: 'contactus', pathMatch: 'full', component: ContactUsComponent },
  //Login Only
  {
    path: 'account',
    pathMatch: 'full',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cardview',
    pathMatch: 'full',
    component: CardviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'catcreate',
    pathMatch: 'full',
    component: CatcreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'catedit/:id',
    component: CateditComponent,
    canActivate: [AuthGuard],
  },
  { path: '*', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
