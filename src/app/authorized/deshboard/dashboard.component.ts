import {Component} from '@angular/core';
import {WalletService} from "../../services/wallet.service";
import {Wallets} from "../../models/Wallet";

@Component({
	selector: 'app-deshboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

	public wallets: Wallets;

	constructor(private walletService: WalletService) {
		const username: string = 'user1';
		this.walletService.getWallets(username).then((wallets) => {
			this.wallets = wallets
		})
	}
}

