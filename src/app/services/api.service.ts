import {Injectable} from '@angular/core';
import {Axios, RawAxiosRequestConfig} from "axios";

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private seedUrl: string = 'http://167.86.93.188:3000/get_node';
	private nodeUrl: string;
	private axiosGet: Axios;

	constructor() {
		const config: RawAxiosRequestConfig = {method: "GET"}
		this.axiosGet = new Axios(config)
	}

	public async getNode(): Promise<string> {
		if (this.nodeUrl != null) {
			return Promise.resolve(this.nodeUrl);
		}
		return this.axiosGet.get(this.seedUrl).then((test) => {
			const data = JSON.parse(test.data);
			console.log(data)
			this.nodeUrl = data.url;
			return data.url;
		});
	}

	async getWallets(): Promise<{ 'private': string, 'public': string }> {
		const nodeUrl = await this.getNode();
		return this.axiosGet.get(nodeUrl + '/wallets').then((test) => {
			return JSON.parse(test.data);
		});
	}


	async buyHoni(wallet: string, amount: number): Promise<boolean> {
		const nodeUrl = await this.getNode();
		return this.axiosGet.get(nodeUrl + `/freemoney?sender=${wallet}&amount=${amount}`).then((test) =>
			JSON.parse(test.data)
		);
	}
}

