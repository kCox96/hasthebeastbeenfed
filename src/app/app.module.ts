import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './account/account.component';
import { CardviewComponent } from './cardview/cardview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CardComponent } from './cardview/card/card.component';
import { AddcatComponent } from './cardview/card/addcat/addcat.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './shared/data.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AccountComponent,
    CardviewComponent,
    CardComponent,
    AddcatComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    FormsModule,  ],
  providers: [AuthenticationService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
