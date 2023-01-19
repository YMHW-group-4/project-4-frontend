import {Component} from '@angular/core';
import {Wallet} from "../../models/Wallet";
import {NotificationService} from "../../services/notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";
import {ApiService} from "../../services/api.service";

@Component({
	selector: 'app-create-wallet',
	templateUrl: './create-wallet.component.html',
	styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent {
	name: string;
	wallet: Wallet;
	user_id: string;
	added: boolean;
	createWalletForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private supabaseService: SupabaseService,
		private notifyService: NotificationService,
		private apiService: ApiService,
	) {
	}

	ngOnInit(): void {
		this.wallet = new Wallet;
		this.added = false;

		this.createWalletForm = this.fb.group({
			name: ['', Validators.required],
		})
	}

	async addWallet() {
		if (this.wallet.id) {
			return;
		}

		this.wallet.user = await this.supabaseService.getUserID();
		const wallets = await this.apiService.getWallets().catch((e) => {
			this.notifyService.showError("Could not get the wallet from the blockchain", "Wallet Not Added")
			return {'private': 'null', 'public': 'null'};
		})
		this.wallet.public_wallet_key = wallets.public;
		this.wallet.private_wallet_key = wallets.private;

		this.supabaseService.addWallet(this.wallet).then((data: { w: any, error: any }) => {
			if (data.error == null) {
				this.walletAddedNotification()
				this.createWalletForm.reset();
				this.added = true;
			} else {
				this.walletNotAddedNotification();
			}
		})

	}

	setAddedFalse() {
		this.added = false;
	}

	walletAddedNotification() {
		this.notifyService.showSuccess(this.wallet.wallet_name + " is added to your account", "Added")
	}

	//TODO: make specific errors
	walletNotAddedNotification() {
		this.notifyService.showError(this.wallet.wallet_name + " is not added to your account due to ...", "Wallet Not Added")
	}
}
