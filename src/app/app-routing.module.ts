import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { CardviewComponent } from './cardview/cardview.component';
import { FAQComponent } from './faq/faq.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CatcreateComponent } from './catcreate/catcreate.component';
import { AuthGuard } from './shared/auth.guard';

// need to add https://angular.io/api/router/CanActivate

export const routes: Routes = [
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'faq', pathMatch: 'full', component: FAQComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'signup', pathMatch: 'full', component: SignupComponent },
  { path: 'contactus', pathMatch: 'full', component: ContactUsComponent },
  //To Be Login Only
  { path: 'account', pathMatch: 'full', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'cardview', pathMatch: 'full', component: CardviewComponent, canActivate: [AuthGuard] },
  { path: 'catcreate', pathMatch: 'full', component: CatcreateComponent, canActivate: [AuthGuard]},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
