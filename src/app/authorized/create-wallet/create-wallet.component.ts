import {Component} from '@angular/core';

@Component({
	selector: 'app-create-wallet',
	templateUrl: './create-wallet.component.html',
	styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent {

	constructor() {
	}

	create_wallet():void{
		console.log("create wallet");
	}
}
