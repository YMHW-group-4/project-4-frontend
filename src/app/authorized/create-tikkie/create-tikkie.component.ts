import {Component} from '@angular/core';
import {SupabaseService} from 'src/app/services/supabase.service';

@Component({
	selector: 'app-create-tikkie',
	templateUrl: './create-tikkie.component.html',
	styleUrls: ['./create-tikkie.component.css']
})
export class CreateTikkieComponent {
	private tikkieBaseUrl: string = 'http://localhost:4200/app/send-money'
	public wallet: string;
	public amount: number = 0;
	public wallets: any;
	public url: string = 'https://youtu.be/dQw4w9WgXcQ?t=1'

	constructor(private supabaseService: SupabaseService) {
	}

	async ngOnInit() {
		const userId = await this.supabaseService.getUserID();
		this.wallets = await this.supabaseService.getWallets(userId);
	}


	update() {
		this.url = `${this.tikkieBaseUrl}?wallet=${this.wallet}&amount=${this.amount}`
	}

	copyUrl() {
		navigator.clipboard.writeText(this.url);
	}
}
