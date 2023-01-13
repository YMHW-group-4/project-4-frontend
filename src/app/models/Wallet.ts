// export interface Wallet {
// 	walletAddress: string;
// 	balance: number;
// }

export class Wallet{
	id: string;
	user: string;
	wallet_name: string;
	public_wallet_key: string;
	private_wallet_key: string;
	balance: number;
}

export type Wallets = Array<Wallet>;


