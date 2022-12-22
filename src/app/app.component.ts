import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './services/supabase.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	session: any;

	constructor(private router: Router,
				private supabaseService: SupabaseService) {
		this.session = this.supabaseService.getSession();
	}

	public ngOnInit(): void {
		this.supabaseService.authChanges((_, session) => this.session = session);
	}

	public isAuthenticated(): boolean {
		if (this.session) {
			return true;
		}
		return false;
	}

	public signOut(): void {
		this.supabaseService.signOut()
			.then(() => {
				this.router.navigate(['/signIn']);
			});
	}

}

// import { Component, OnInit } from '@angular/core'
// import { SupabaseService } from './services/supabase.service'
//
// @Component({
// 	selector: 'app-root',
// 	templateUrl: './app.component.html',
// 	styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit {
// 	title = 'angular-user-management'
//
// 	session = this.supabase.session
//
// 	constructor(private readonly supabase: SupabaseService) {}
//
// 	ngOnInit() {
// 		this.supabase.authChanges((_, session) => (this.session = session))
// 	}
// }
