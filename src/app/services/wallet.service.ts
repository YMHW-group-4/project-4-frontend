import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

	private tempWallets: WalletData[] = [
		{walletAddress: 'TEMP-WALLET-ADDRESS-1', balance: 12},
		{walletAddress: 'TEMP-WALLET-ADDRESS-2', balance: 18},
		{walletAddress: 'TEMP-WALLET-ADDRESS-3', balance: 6},
	]

	getWallets(): Promise<Array<WalletData>> {
		return new Promise<Array<WalletData>>((resolve, _) => resolve(this.tempWallets));
	}

	getWallet(walletAddress: string): Promise<WalletData | undefined> {
		return new Promise<WalletData | undefined>((resolve, _) => {
			resolve(this.tempWallets.find((wallet) => wallet.walletAddress === walletAddress))
		});
	}
}



export interface WalletData {
	walletAddress: string;
	balance: number;
}
