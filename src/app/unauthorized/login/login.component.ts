import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginService} from "../../services/login.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validateformfields from "../../helpers/validateformfields";
import {IUser, SupabaseService} from "../../services/supabase.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public username: string;
	public password: string;
	public email: string;

	type: string = "password"
	isText: boolean = false
	eyeIcon: string = "fa-eye-slash"

	loading: boolean;
	user: IUser;

	signInForm = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required],
	})


	constructor(
		private authService: AuthService,
		private loginService: LoginService,
		private fb: FormBuilder,
		private readonly formBuilder: FormBuilder,
		private router: Router,
		private supabaseService: SupabaseService
	) {
		this.loading = false;
		this.user = {} as IUser;
	}

	// public doLogin() {
	// 	this.loginService.login(this.username, this.password).then((user: User) => {
	// 		// TODO: Auth flow.
	// 		// TODO: Create checks.
	// 		console.log(user);
	// 		this.router.navigateByUrl('/app')
	// 	});
	// }

	public doLogin(email: string, password: string): void {
		this.loading = true;
		this.supabaseService.signIn(email, password)
			.then((user) => {
				console.log(user);
				this.user = user;
				this.router.navigateByUrl('app').catch((errer) => {
					console.log(errer);
				})
			}).catch(() => {
			this.loading = false;
		});
	}

	showPassword() {
		this.isText = !this.isText;
		this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
		this.isText ? this.type = "text" : this.type = "password"
	}

	onSubmit() {
		if (this.signInForm.valid) {
			//	send to db
			console.log(this.signInForm.value)
			const email = this.signInForm?.value?.email || '';
			const password = this.signInForm?.value?.password || ''
			this.doLogin(email, password);
		} else {
			console.log("form is not valid")
			Validateformfields.validateFormFields(this.signInForm)
			alert("Invalid login")
		}
	}

}
