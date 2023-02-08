import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";
import {ApiService} from "../../services/api.service";
import {NotificationService} from "../../services/notification.service";
import {ActivatedRoute} from "@angular/router";
import {Wallets} from "../../models/Wallet";

@Component({
	selector: 'app-stake-money',
	templateUrl: './stake-money.component.html',
	styleUrls: ['./stake-money.component.scss']
})
export class StakeMoneyComponent implements OnInit {
	public_self: string;
	private_key: string;
	recipient: string
	amount_to_send: number;

	wallets: Wallets = [];
	userId: string;
	sendHoinForm: FormGroup = this.fb.group({
		wallet: [''],
		recipient: ['', Validators.required],
		amount: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
	})

	constructor(
		private fb: FormBuilder,
		private supabaseService: SupabaseService,
		private apiService: ApiService,
		private notifyService: NotificationService,
		private route: ActivatedRoute,
	) {
	}

	async ngOnInit() {
		this.userId = await this.supabaseService.getUserID();
		this.wallets = await this.supabaseService.getWallets(this.userId);

		const recipient = this.route.snapshot.queryParams['wallet'] ?? '';
		const amount = this.route.snapshot.queryParams['amount'] ?? '';

		this.sendHoinForm.patchValue({recipient, amount})
	}

	getPrivateKey(pubKey: string): string {
		return this.wallets.find((w) => w.public_wallet_key === pubKey)?.private_wallet_key ?? 'null'
	}

	stakeHoin() {
		this.apiService.stakeHoin(this.public_self, this.amount_to_send, this.getPrivateKey(this.public_self)).then((r) => {
			console.log(r);
			this.notifyService.showSuccess("", "Transaction successful")
		}).catch((e) => {
			this.notifyService.showError("There was a error!", "Transaction not successful")
			console.warn(e);
		})
	}
}
