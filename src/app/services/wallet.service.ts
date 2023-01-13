import {Injectable} from '@angular/core';
import {Wallet, Wallets} from "../models/Wallet";
import {TempBackendService} from "./temp-backend.service";

@Injectable({
	providedIn: 'root'
})
export class WalletService {

	constructor(private tempBackend: TempBackendService) {
	}

	// getWallets(username: string): Promise<Wallets> {
	// 	return this.tempBackend.get('wallets', {username});
	// }
	//
	// getWallet(walletAddress: string): Promise<Wallet> {
	// 	return this.tempBackend.get('wallet', {walletAddress});
	// }
}
