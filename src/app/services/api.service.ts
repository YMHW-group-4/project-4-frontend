import {Injectable} from '@angular/core';
import {Axios, AxiosResponse, RawAxiosRequestConfig} from "axios";

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

	async sendHoin(sender: string, receiver: string, amount: number, signature: string = "null") {
		const nodeUrl = await this.getNode();
		return this.axiosGet.post(nodeUrl + `/transaction?sender=${sender}&receiver=${receiver}&amount=${amount}`).then((response) => JSON.parse(response.data));
	}

	async buyHoni(wallet: string, amount: number): Promise<boolean> {
		const nodeUrl = await this.getNode();
		return this.axiosGet.post(nodeUrl + `/freemoney?sender=${wallet}&amount=${amount}`).then((response) => {
			console.log(response);
			return response.data;
		})
	}

	async getBalance(sender: string): Promise<AxiosResponse<any> | number> {
		const nodeUrl = await this.getNode();
		return this.axiosGet.get(nodeUrl + `/balance?sender=${sender}`).then((response) => {
			return response.data;
		}).catch((e) => {
			console.log(e);
			return 0;
		})
	}
}

