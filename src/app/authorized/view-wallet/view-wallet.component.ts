import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Wallet} from "../../models/Wallet";
import {SupabaseService} from "../../services/supabase.service";

@Component({
	selector: 'app-view-wallet',
	templateUrl: './view-wallet.component.html',
	styleUrls: ['./view-wallet.component.css']
})
export class ViewWalletComponent {

	//TODO: hier nog naar kijken!!!
	wallet: any[] = [];
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	public_wallet_key: string;
	userId: string;

	constructor(private supabaseService: SupabaseService,
				private route: ActivatedRoute,
				private router: Router,
				) {
	}

	async ngOnInit() {
		this.userId = await this.supabaseService.getUserID();
		this.public_wallet_key = this.route.snapshot.params['public_wallet_key'];
		this.wallet = await this.supabaseService.getWallet(this.userId, this.public_wallet_key);

		console.log(this.wallet)

		// this.supabaseService.getWallet(this.userId, this.public_wallet_key).then((walletData) => {
		// 	if (walletData != undefined) {
		// 		this.wallet = walletData;
		// 	}
		// })
	}

	public navigate() {
		this.router.navigateByUrl(`/app/view-wallet/${this.public_wallet_key}`).then(_ => this.ngOnInit())
	}
}
