import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./services/auth.guard";
import {DashboardComponent} from "./authorized/deshboard/dashboard.component";
import {HomeComponent} from "./unauthorized/home/home.component";
import {CreateTikkieComponent} from "./authorized/create-tikkie/create-tikkie.component";
import {NavigationComponent} from "./authorized/navigation/navigation.component";
import {BuySellHoinComponent} from "./authorized/buy-sell-hoin/buy-sell-hoin.component";
import {ViewWalletComponent} from "./authorized/view-wallet/view-wallet.component";

const routes: Routes = [
	{
		path: 'app', component:NavigationComponent, canActivate: [AuthGuard], children: [
			{path: '', component: DashboardComponent},
			{path: 'tikkie', component: CreateTikkieComponent},
			{path: 'view-wallet/:walletAddress', component: ViewWalletComponent},
			{path: 'buy-hoin', component: BuySellHoinComponent, data: {buyHoin: true}},
			{path: 'sell-hoin', component: BuySellHoinComponent, data: {buyHoin: false}},
		]
	},
	{path: '', component: HomeComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
