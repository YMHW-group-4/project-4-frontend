import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginService} from "../../services/login.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validateformfields from "../../helpers/validateformfields";
import {SupabaseService} from "../../services/supabase.service";

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
	loginForm!: FormGroup

	loading = false

	signInForm = this.formBuilder.group({
		email: '',
	})


	constructor(
		private authService: AuthService,
		private loginService: LoginService,
		private router: Router,
		private fb: FormBuilder,
		private readonly supabase: SupabaseService,
		private readonly formBuilder: FormBuilder
	) {
	}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			// username: ['', Validators.required],
			// password: ['', Validators.required],
			email: ['', Validators.required]
		})
	}

	public doLogin() {
		this.loginService.login(this.username, this.password).then((user: User) => {
			// TODO: Auth flow.
			// TODO: Create checks.
			console.log(user);
			this.router.navigateByUrl('/app')
		});
	}

	showPassword() {
		this.isText = !this.isText;
		this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
		this.isText ? this.type = "text" : this.type = "password"
	}

	async onSubmit(): Promise<void> {
		try {
			this.loading = true
			const email = this.signInForm.value.email as string
			const { error } = await this.supabase.signIn(email)
			if (error) throw error
			alert('Check your email for the login link!')
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
		} finally {
			this.signInForm.reset()
			this.loading = false
		}
	}

}
