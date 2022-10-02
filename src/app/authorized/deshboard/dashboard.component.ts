import {Component} from '@angular/core';
import {WalletData, WalletService} from "../../services/wallet.service";

@Component({
	selector: 'app-deshboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

	public wallets: Array<WalletData>;

	constructor(private walletService: WalletService) {
		this.walletService.getWallets().then((wallets) => {
			this.wallets = wallets
		})
	}
}

