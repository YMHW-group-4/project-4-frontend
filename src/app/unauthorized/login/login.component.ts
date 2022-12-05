import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginService} from "../../services/login.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validateformfields from "../../helpers/validateformfields";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public username: string;
	public password: string;

	type: string = "password"
	isText: boolean = false
	eyeIcon: string = "fa-eye-slash"
	loginForm!: FormGroup

	constructor(
		private authService: AuthService,
		private loginService: LoginService,
		private router: Router,
		private fb: FormBuilder
	) {
	}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	public doLogin() {
		this.loginService.login(this.username, this.password).then((user: User) => {
			// TODO: Auth flow.
			// TODO: Create checks.
			console.log(user);
			this.router.navigateByUrl('/app')
		})
	}

	showPassword() {
		this.isText = !this.isText;
		this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
		this.isText ? this.type = "text" : this.type = "password"
	}

	onSubmit() {
		if (this.loginForm.valid) {
			//	send to db
			console.log(this.loginForm.value)
		} else {
			console.log("form is not valid")
			Validateformfields.validateFormFields(this.loginForm)
			alert("Invalid login")
		}
	}

}
