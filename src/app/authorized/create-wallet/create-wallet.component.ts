import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SupabaseService} from "../../services/supabase.service";
import {Wallet} from "../../models/Wallet";
import {NotificationService} from "../../services/notification.service";

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
		private notifyService : NotificationService
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
		this.wallet.public_wallet_key = "todo: generate public key on blockchain";
		this.wallet.private_wallet_key = "todo: generate private key on blockchain";

		this.supabaseService.addWallet(this.wallet).then((data: {w:any, error: any}) => {
			if(data.error == null){
				this.walletAddedNotification()
				this.createWalletForm.reset();
				this.added = true;
			}
			else{
				this.walletNotAddedNotification();
			}
		})

	}

	setAddedFalse(){
		this.added = false;
	}

	walletAddedNotification(){
		this.notifyService.showSuccess(this.wallet.wallet_name + " is added to your account", "Added")
	}

	//TODO: make specific errors
	walletNotAddedNotification(){
		this.notifyService.showError(this.wallet.wallet_name + " is not added to your account due to ...", "Wallet Not Added")
	}
}
