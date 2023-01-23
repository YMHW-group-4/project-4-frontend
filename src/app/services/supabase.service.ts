import {Injectable} from '@angular/core';
import {AuthChangeEvent, createClient, Session, User} from '@supabase/supabase-js';

import {environment} from '../../environments/environment';
import {Wallet} from "../models/Wallet";

export interface IUser {
	email: string;
	name: string;
	website: string;
	url: string;
}

@Injectable({
	providedIn: 'root',
})
export class SupabaseService {

	private supabaseClient: any;

	constructor() {
		this.supabaseClient = createClient(environment.supabase.url, environment.supabase.key);
	}

	public async getUser(): Promise<User | null> {
		return (await this.getSession())?.user || null
	}

	public async getSession(): Promise<Session | null> {
		return (await this.supabaseClient?.auth?.getSession())?.data?.session;
	}

	public async getProfile(): Promise<any> {
		const user = await this.getUser();

		return this.supabaseClient.from('profiles')
			.select('username, website, avatar_url')
			.eq('id', user?.id)
			.single();
	}

	public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): any {
		return this.supabaseClient.auth.onAuthStateChange(callback);
	}

	public signIn(email: string, password: string): Promise<any> {
		return this.supabaseClient.auth.signInWithPassword({email, password});
	}

	//TODO: make one function for all
	async signInWithGoogle() {
		const {data, error} = await this.supabaseClient.auth.signInWithOAuth({
			provider: 'google',
		}, {
			redirectTo: 'http://localhost:4200/app'
		})
	}

	async signInWithTwitter() {
		const {data, error} = await this.supabaseClient.auth.signInWithOAuth({
			provider: 'twitter',
		}, {
			redirectTo: 'http://localhost:4200/app'
		})
	}

	async signInWithFacebook() {
		const {data, error} = await this.supabaseClient.auth.signInWithOAuth({
			provider: 'facebook',
		}, {
			redirectTo: 'http://localhost:4200/app'
		})
	}

	async signInWithApple() {
		const {data, error} = await this.supabaseClient.auth.signInWithOAuth({
			provider: 'apple',
		}, {
			redirectTo: 'http://localhost:4200/app'
		})
	}

	async signInWithGitHub() {
		const { data, error } = await this.supabaseClient.auth.signInWithOAuth({
			provider: 'github',
		},{
			redirectTo: 'http://localhost:4200/app'
		})
	}
	//-------------------------------------

	public register(userData: any): Promise<any> {
		return this.supabaseClient.auth.signUp(
			{
				email: userData.email, password: userData.password, options: null
			}
		);
	}

	public resetPassword(userData: any): Promise<any> {
		console.log(userData)
		return this.supabaseClient.auth.resetPasswordForEmail((userData.email), (userData.url, ''));
	}

	public signOut(): Promise<any> {
		return this.supabaseClient.auth.signOut();
	}

	async signout() {
		const {error} = await this.supabaseClient.auth.signOut()
	}

	//TODO: doesn't work yet, whole component
	public async updateProfile(userUpdate: IUser): Promise<any> {
		const user = await this.getUser();

		const update = {
			username: userUpdate.name,
			website: userUpdate.website,
			id: user?.id,
			updated_at: new Date(),
		};

		return this.supabaseClient.from('profiles').upsert(update, {
			returning: 'minimal', // Do not return the value after inserting
		});
	}

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	async getUserID(): Promise<any> {
		return this.getUser().then((user) => {
			return user?.id
		});
	}

	//TODO: make walletservice
	async addWallet(wallet: Wallet) {
		const {w, error} = await this.supabaseClient
			.from('wallets')
			.insert(wallet)
		return {w, error};
	}

	async getWallets(user: string) {
		const wallets = await this.supabaseClient
			.from('wallets')
			.select('*')
			.eq('user', user)
			.order('id');

		return wallets.data;
	}

	async getWallet(user: string, wallet_name: string) {
		const wallet = await this.supabaseClient
			.from('wallets')
			.select('*')
			.eq('user', user)
			.eq('wallet_name', wallet_name).single()

		return wallet.data;
	}
}
