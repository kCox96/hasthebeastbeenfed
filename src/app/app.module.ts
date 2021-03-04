import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './account/account.component';
import { CardviewComponent } from './cardview/cardview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CardComponent } from './cardview/card/card.component';
import { AddcatComponent } from './cardview/addcat/addcat.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './shared/data.service';
import { AuthenticationService } from './shared/authentication.service';
import { FooterComponent } from './footer/footer.component';

import { FAQComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CatcreateComponent } from './catcreate/catcreate.component';
import { AuthInterceptorProviders } from './shared/auth.interceptor';
import { CateditComponent } from './catedit/catedit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    AccountComponent,
    CardviewComponent,
    CardComponent,
    AddcatComponent,
    FooterComponent,
    HomepageComponent,
    FAQComponent,
    ContactUsComponent,
    CatcreateComponent,
    CateditComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthInterceptorProviders, AuthenticationService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
