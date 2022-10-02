import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
	selector: 'app-buy-sell-hoin',
	templateUrl: './buy-sell-hoin.component.html',
	styleUrls: ['./buy-sell-hoin.component.scss']
})
export class BuySellHoinComponent {
	public buyHoin: boolean;
	public amount: number = 0;
	public transferPromise: Promise<void>;

	constructor(private route: ActivatedRoute, private toastr: ToastrService) {

		this.buyHoin = this.route.snapshot.data['buyHoin']
		console.log(this.buyHoin);
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
