import {Component} from '@angular/core';
import {WalletService} from "../../services/wallet.service";
import {Wallets} from "../../models/Wallet";
import {SupabaseService} from "../../services/supabase.service";
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: 'app-deshboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

	wallets: any[] = [];
	userId: string;

	constructor(
		private supabaseService: SupabaseService,
		private route: ActivatedRoute) {
	}

	async ngOnInit() {
		this.userId = await this.supabaseService.getUserID();

		this.wallets = await this.supabaseService.getWallets(this.userId);
	}
}

