import {Injectable} from '@angular/core';
import {AuthChangeEvent, createClient, Session, SupabaseClient, User} from '@supabase/supabase-js';

import {environment} from '../../environments/environment';

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

}
