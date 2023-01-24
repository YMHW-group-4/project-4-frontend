import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";
import {ApiService} from "../../services/api.service";

@Component({
	selector: 'app-buy-sell-hoin',
	templateUrl: './buy-sell-hoin.component.html',
	styleUrls: ['./buy-sell-hoin.component.scss']
})
export class BuySellHoinComponent {
	public buyHoin: boolean;
	public amount: number;
	public transferPromise: Promise<void>;

	wallets: any[] = [];
	userId: string;
	buy_sellHoinForm!: FormGroup
	user_wallet: any;

	constructor(private route: ActivatedRoute,
				private toastr: ToastrService,
				private fb: FormBuilder,
				private supabaseService: SupabaseService,
				private apiService: ApiService
	) {
		this.buyHoin = this.route.snapshot.data['buyHoin']
		console.log(this.buyHoin);
	}

	async ngOnInit() {
		this.userId = await this.supabaseService.getUserID();
		this.wallets = await this.supabaseService.getWallets(this.userId);

		this.buy_sellHoinForm = this.fb.group({
			amount: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
		})
	}

	public transferHoin() {
		console.log(this.user_wallet, this.amount);
		this.apiService.buyHoni(this.user_wallet, this.amount).then((t) => {
			console.log(t);
		})
	}
}
