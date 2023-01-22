import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";

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

	constructor(private route: ActivatedRoute,
				private toastr: ToastrService,
				private fb: FormBuilder,
				private supabaseService: SupabaseService) {

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
		new Promise<void>((resolve, _) => {
			return resolve()
		}).then(() =>    {
			console.log('test');
			this.toastr.success('Hello world!', 'Toastr fun!');
		});
	}
}
