import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";
import {ApiService} from "../../services/api.service";
import {NotificationService} from "../../services/notification.service";

@Component({
	selector: 'app-buy-sell-hoin',
	templateUrl: './buy-sell-hoin.component.html',
	styleUrls: ['./buy-sell-hoin.component.scss']
})
export class BuySellHoinComponent implements OnInit {
	public buyHoin: boolean;
	public amount: number;
	public balance: number;

	wallets: any[] = [];
	userId: string;
	user_wallet: any;

	buy_sellHoinForm = this.fb.group({
		amount: new FormControl(['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]]),
		wallet: new FormControl(['']),
	})

	constructor(private route: ActivatedRoute,
				private toastr: ToastrService,
				private fb: FormBuilder,
				private supabaseService: SupabaseService,
				private apiService: ApiService,
				private notification: NotificationService
	) {
		this.buyHoin = this.route.snapshot.data['buyHoin']
	}

	async ngOnInit() {
		this.userId = await this.supabaseService.getUserID();
		this.wallets = await this.supabaseService.getWallets(this.userId);
		this.balance = await this.supabaseService.getWallets(this.userId);
	}

	public transferHoin() {
		this.apiService.buyHoni(this.user_wallet, this.amount).then((t) => {
			console.log(t);
			this.notification.showSuccess("", "Successful");
		}).catch((e) => {
			console.warn(e);
			this.notification.showError("There was a error", "Not successful")
		})
	}
}
