import {Wallets} from "./Wallet";

export interface User {
	username: string;
	wallets: Wallets;
	authToken: string;
}



export interface TempDatabaseUser extends User{
	password: string
}
