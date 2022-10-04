import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WalletService} from "../../services/wallet.service";
import {Wallet} from "../../models/Wallet";

@Component({
	selector: 'app-view-wallet',
	templateUrl: './view-wallet.component.html',
	styleUrls: ['./view-wallet.component.css']
})
export class ViewWalletComponent {

	public wallet: Wallet;
	public walletAddress: string;

	constructor(private route: ActivatedRoute, private router: Router, private walletService: WalletService) {
		this.init();
	}

	private init() {
		this.walletAddress = this.route.snapshot.params['walletAddress'];

		this.walletService.getWallet(this.walletAddress).then((walletData) => {
			if (walletData != undefined) {
				this.wallet = walletData;
			}
		})
	}

	public navigate() {
		this.router.navigateByUrl(`/app/view-wallet/${this.walletAddress}`).then(_ => this.init())
	}
}
