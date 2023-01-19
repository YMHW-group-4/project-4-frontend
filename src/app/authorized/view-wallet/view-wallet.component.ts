import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Wallet} from "../../models/Wallet";
import {SupabaseService} from "../../services/supabase.service";
import {NotificationService} from "../../services/notification.service";

@Component({
	selector: 'app-view-wallet',
	templateUrl: './view-wallet.component.html',
	styleUrls: ['./view-wallet.component.css']
})
export class ViewWalletComponent {

	wallet: Wallet;
	wallet_name: string;
	public_wallet_key: string;
	userId: string;

	constructor(private supabaseService: SupabaseService,
				private route: ActivatedRoute,
				private router: Router,
				private notifyService: NotificationService,
	) {
	}

	async ngOnInit() {
		this.userId = await this.supabaseService.getUserID();
		this.wallet_name = this.route.snapshot.params['wallet_name'];
		this.wallet = await this.supabaseService.getWallet(this.userId, this.wallet_name)

		// this.supabaseService.getWallet(this.userId, this.public_wallet_key).then((walletData) => {
		// 	if (walletData != undefined) {
		// 		this.wallet = walletData;
		// 	}
		// })
	}

	public navigate() {
		this.router.navigateByUrl(`/app/view-wallet/${this.wallet_name}`).then(_ => this.ngOnInit())
	}

	//TODO: make specific errors
	walletNotAddedNotification() {
		this.notifyService.showError("Could not found this wallet", "Wallet Not Found")
	}
}
