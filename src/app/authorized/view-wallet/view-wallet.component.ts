import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Wallet} from "../../models/Wallet";
import {SupabaseService} from "../../services/supabase.service";
import {ApiService} from "../../services/api.service";

@Component({
	selector: 'app-view-wallet',
	templateUrl: './view-wallet.component.html',
	styleUrls: ['./view-wallet.component.css']
})
export class ViewWalletComponent {

	wallet: Wallet;
	wallet_name: string;
	userId: string;
	private wallet_key: string;

	constructor(private supabaseService: SupabaseService,
				private route: ActivatedRoute,
				private router: Router,
				private apiService: ApiService,
	) {
	}

	async ngOnInit() {
		this.userId = await this.supabaseService.getUserID();
		this.wallet_name = this.route.snapshot.params['wallet_name'];
		this.wallet_key = this.route.snapshot.params['wallet_key'];

		if (this.wallet_name) {
			this.wallet = await this.supabaseService.getWallet(this.userId, this.wallet_name)
		} else if(this.wallet_key) {
			this.wallet = await this.apiService.getWallet(this.wallet_key);
		}

	}

	public navigate() {
		this.router.navigateByUrl(`/app/view-wallet/search/${this.wallet_name}`).then(_ => this.ngOnInit())
	}

}
