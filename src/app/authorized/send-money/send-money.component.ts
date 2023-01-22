import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";
import {Wallet} from "../../models/Wallet";

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss']
})
export class SendMoneyComponent implements OnInit {
	recipient: string
	wallets: any[] = [];
	userId: string;
	sendHoinForm!: FormGroup

	constructor(
		private fb: FormBuilder,
		private supabaseService: SupabaseService
	) {
	}

	async ngOnInit() {
		this.userId = await this.supabaseService.getUserID();
		this.wallets = await this.supabaseService.getWallets(this.userId);

		this.sendHoinForm = this.fb.group({
			recipient: ['', Validators.required],
			amount: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
		})
	}

	sendHoin(){
		console.log("send")
	}

}
