import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TradeComponent } from './trade/trade.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { ConfirmcodeComponent } from './confirmcode/confirmcode.component';
import { ConfirmcodeService } from './confirmcode/confirmcode.service';
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { TradeService } from './trade/trade.service';
import { IAppState, INITIAL_STATE, rootReducer } from './store';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { ConfirmGuard } from './services/confirm-guard.service';
import { LoaderComponent } from './loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from './home/home.service';
import { CityApartmentsComponent } from './city-apartments/city-apartments.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CardComponent } from './card/card.component';
import { CardApartmentComponent } from './card-apartment/card-apartment.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    HomeComponent,
    NotFoundComponent,
    TradeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmcodeComponent,
    LoaderComponent,
    CityApartmentsComponent,
    CityApartmentsComponent,
    CardComponent,
    CardApartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgReduxModule,
    BrowserAnimationsModule,
    NgbModule,
    DateRangePickerModule
  ],
  providers: [
    LoginService,
    RegisterService,
    ConfirmcodeService,
    TradeService,
    AuthService,
    AuthGuard,
    ConfirmGuard,
    HomeService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {

    let enhancers = isDevMode() ? [devTools.enhancer()] : []
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}