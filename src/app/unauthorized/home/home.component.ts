import {Component} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	constructor(private supabaseService: SupabaseService) {

	}

	googleLogin(){
		this.supabaseService.signInWithGoogle();
	}

	twitterLogin(){
		this.supabaseService.signInWithTwitter();
	}

	facebookLogin(){
		this.supabaseService.signInWithFacebook();
	}

	appleLogin(){
		this.supabaseService.signInWithApple();
	}

	githubLogin(){
		this.supabaseService.signInWithGitHub();
	}
}
