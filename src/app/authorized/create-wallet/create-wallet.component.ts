import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SupabaseService} from "../../services/supabase.service";
import {Wallet} from "../../models/wallet.model";

@Component({
	selector: 'app-create-wallet',
	templateUrl: './create-wallet.component.html',
	styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent {
	public name: string;

	wallet: Wallet;
	user_id: string;

	createWalletForm!: FormGroup

	constructor(
		private fb: FormBuilder,
		private supabaseService: SupabaseService

	) {
	}

	ngOnInit(): void {
		this.wallet = new Wallet;

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

		this.supabaseService.addWallet(this.wallet)
	}
}
