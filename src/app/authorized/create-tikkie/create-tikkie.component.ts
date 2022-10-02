import {Component} from '@angular/core';

@Component({
	selector: 'app-create-tikkie',
	templateUrl: './create-tikkie.component.html',
	styleUrls: ['./create-tikkie.component.css']
})
export class CreateTikkieComponent {

	public tikkieBaseUrl: string = 'http://localhost:4200/app/tikkie'
	public wallet: string;
	public amount: number = 0;

	constructor() {
		this.wallet = 'TEMPWALLETADDRESS' // Get the real user address
	}


}
