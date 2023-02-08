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
	wo_wallets: any[] = [];
	canCreate: boolean;
	showWalletResults: boolean = false;

	constructor(
		private fb: FormBuilder,
		private supabaseService: SupabaseService,
		private notifyService: NotificationService,
		private apiService: ApiService,
	) {}

	ngOnInit(): void {
		this.wallet = new Wallet;
		this.added = false;
		this.canCreate = false;

		this.createWalletForm = this.fb.group({
			name: ['', Validators.required],
		})
	}

	async addWallet() {
		console.log('Begin showWalletResults', this.showWalletResults)
		if (this.wallet.id) {
			return;
		}

		await this.setUserId();
		await this.getWallets(this.user_id);

		for (let w of this.wo_wallets) {
			if (this.wallet.wallet_name == w.wallet_name) {
				this.walletnameAlreadyToken();
				return;
			}
		}

		this.canCreate = true;

		if(this.canCreate){
			const wallets = await this.apiService.getWallets().catch((e) => {
				this.notifyService.showError("Could not create wallet", "Couldn't get keypair")
				return {'Pub': 'null', 'Priv': 'null', 'Mnemonic': 'null'};
			})

			console.log('CanCreate showWalletResults', this.showWalletResults)
			console.log('CanCreate wallets', wallets)

			this.wallet.public_wallet_key = wallets.Pub;
			this.wallet.private_wallet_key = wallets.Priv;
			this.wallet.mnemonic = wallets.Mnemonic;
			this.wallet.user = this.user_id;

			this.showWalletResults = true;


			this.supabaseService.addWallet(this.wallet).then((data: { w: any, error: any }) => {
				if (data.error == null) {
					this.walletAddedNotification()
					this.createWalletForm.reset();
					this.added = true;
				} else {
					// this.walletNotAddedNotification();
				}
			})
		}
	}

	setAddedFalse() {
		this.added = false;
	}

	async setUserId() {
		this.user_id = await this.supabaseService.getUserID();
	}

	async getWallets(u_id: string) {
		this.wo_wallets = await this.supabaseService.getWallets(u_id);
	}



	//notifications
	walletAddedNotification() {
		this.notifyService.showSuccess(this.wallet.wallet_name + " is added to your account", "Added")
	}

	walletnameAlreadyToken() {
		this.notifyService.showError("Wallet with name " + this.wallet.wallet_name + " already exists", "Could Not Add Wallet")
	}

	//TODO: make specific errors
	walletNotAddedNotification() {
		this.notifyService.showError(this.wallet.wallet_name + " is not added to your account due to ...", "Wallet Not Added")
	}
}
