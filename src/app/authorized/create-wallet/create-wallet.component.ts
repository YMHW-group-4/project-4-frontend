import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-create-wallet',
	templateUrl: './create-wallet.component.html',
	styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent {
	public name: string;
	createWalletForm!: FormGroup

	constructor(
		private fb: FormBuilder
	) {
	}

	ngOnInit(): void {
		this.createWalletForm = this.fb.group({
			name: ['', Validators.required],
		})
	}

	create_wallet():void{
		console.log("create wallet");
	}
}
