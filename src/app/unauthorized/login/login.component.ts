import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginService} from "../../services/login.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public username: string;
	public password: string;

	constructor(
		private authService: AuthService,
		private loginService: LoginService,
		private router: Router
	) {
	}

	public doLogin() {
		this.loginService.login(this.username, this.password).then((user: User) => {
			// TODO: Auth flow.
			// TODO: Create checks.
			console.log(user);
			this.router.navigateByUrl('/app')
		})
	}
}
