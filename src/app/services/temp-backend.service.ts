import {Injectable} from '@angular/core';
import {TempDatabaseUser, User} from "../models/User";
import {Wallet, Wallets} from "../models/Wallet";
import {Params} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class TempBackendService {

	// public get(url: string, params: Params = {}): Promise<any> {
	// 	switch (url) {
	// 		case 'login':
	// 			return this.login(params);
	// 		case 'wallets':
	// 			return this.getWallets(params);
	// 		case 'wallet':
	// 			return this.getWallet(params);
	// 	}
	// 	return this.promiseNull();
	// }

	// public post(url: string, body: Params = {}): Promise<any> {
	// 	switch (url) {
	// 		case 'register':
	// 			return this.register(body);
	// 	}
	// 	return this.promiseNull();
	// }

	private promiseNull() {
		return new Promise((resolve, _) => resolve(null));
	}

	// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	// =-=-=-=-=-=-=-= WALLETS =-=-=-=-=-=-=-=
	// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	// private wallets: Wallets = [
	// 	{walletAddress: 'TEMP-WALLET-ADDRESS-1', balance: 12},
	// 	{walletAddress: 'TEMP-WALLET-ADDRESS-2', balance: 18},
	// 	{walletAddress: 'TEMP-WALLET-ADDRESS-3', balance: 6},
	// ]
	//
	// private getWallets(params: Params): Promise<Wallets| undefined> {
	// 	return new Promise<Wallets | undefined>((resolve, _) => {
	// 		const user = this.users.find((user) => user.username === params['username']);
	// 		resolve(user?.wallets)
	// 	});
	// }
	//
	// private getWallet(params: Params): Promise<Wallet | undefined> {
	// 	return new Promise<Wallet | undefined>((resolve, _) => {
	// 		resolve(this.wallets.find((wallet) => wallet.walletAddress === params['walletAddress']))
	// 	});
	// }


	// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	// =-=-=-=-=-=-=-=-= USER =-=-=-=-=-=-=-=-=
	// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	// private users: TempDatabaseUser[] = [
	// 	{username: 'user1', wallets: this.wallets, password: 'user1', authToken: 'user1_AuthToken'},
	// 	{username: 'user2', wallets: this.wallets, password: 'user2', authToken: 'user2_AuthToken'},
	// 	{username: 'user3', wallets: this.wallets, password: 'user3', authToken: 'user3_AuthToken'},
	// 	{username: 'user4', wallets: this.wallets, password: 'user4', authToken: 'user4_AuthToken'},
	// 	{username: 'user5', wallets: this.wallets, password: 'user5', authToken: 'user5_AuthToken'},
	// 	{username: 'user6', wallets: this.wallets, password: 'user6', authToken: 'user6_AuthToken'},
	// 	{username: 'user7', wallets: this.wallets, password: 'user7', authToken: 'user7_AuthToken'},
	// 	{username: 'user8', wallets: this.wallets, password: 'user8', authToken: 'user8_AuthToken'},
	// 	{username: 'user9', wallets: this.wallets, password: 'user9', authToken: 'user9_AuthToken'},
	// ]

	// private login(params: Params): Promise<User | undefined> {
	// 	return new Promise<User | undefined>((resolve, _) => {
	// 		resolve(this.users.find((user) => user.username === params['username'] && user.password === params['password']))
	// 	});
	// }

	// private register(body: Params) {
	// 	return new Promise<User | undefined>((resolve, _) => {
	// 		const user = {
	// 			username: body['username'],
	// 			password: body['password'],
	// 			wallets: [],
	// 			authToken: body['username'] + '_AuthToken',
	// 		}
	// 		this.users.push(user)
	// 		resolve(user);
	// 	});
	// }
}

