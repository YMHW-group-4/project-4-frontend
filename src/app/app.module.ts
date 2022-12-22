import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from "./authorized/deshboard/dashboard.component";
import {QRCodeModule} from "angularx-qrcode";
import {CreateTikkieComponent} from "./authorized/create-tikkie/create-tikkie.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavigationComponent} from './authorized/navigation/navigation.component';
import {BuySellHoinComponent} from "./authorized/buy-sell-hoin/buy-sell-hoin.component";
import {NgxAsyncTemplateModule} from "@klippa/ngx-async-template";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {ViewWalletComponent} from "./authorized/view-wallet/view-wallet.component";
import {HomeComponent} from "./unauthorized/home/home.component";
import {LoginComponent} from "./unauthorized/login/login.component";
import {TransverComponent} from "./authorized/transver/transver.component";
import {RegisterComponent} from "./unauthorized/register/register.component";
import {CreateWalletComponent} from "./authorized/create-wallet/create-wallet.component";
import { ProfileComponent } from './authorized/profile/profile.component';
import { ResetPasswordComponent } from './unauthorized/reset-password/reset-password.component';
import { NewPasswordComponent } from './unauthorized/new-password/new-password.component';


@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		CreateTikkieComponent,
		NavigationComponent,
		BuySellHoinComponent,
		ViewWalletComponent,
		HomeComponent,
		LoginComponent,
		TransverComponent,
		RegisterComponent,
		CreateWalletComponent,
  ProfileComponent,
  ResetPasswordComponent,
  NewPasswordComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		QRCodeModule,
		FormsModule,
		NgxAsyncTemplateModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(), // ToastrModule added
		ReactiveFormsModule, // for login en registration
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
