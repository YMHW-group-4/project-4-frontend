import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validateformfields from "../../helpers/validateformfields";
import {RegisterService} from "../../services/register.service";
import {SupabaseService} from "../../services/supabase.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	type: string = "password"
	isText: boolean = false
	eyeIcon: string = "fa-eye-slash"

	loading: boolean;

	registerForm = this.fb.group({
			email: ['', Validators.required],
			password: ['',
				[Validators.required,
					Validators.minLength(6)]
			],
			confirmedpassword: ['', Validators.required],
		},
		{
			validators: this.mustMatch('password', 'confirmedpassword')
		})

	constructor(private fb: FormBuilder,
				private supabaseService: SupabaseService,
				private notifyService: NotificationService,
				private router: Router,) {
		this.loading = false;
	}


	mustMatch(controlName: string, matchingControlName: string) {
		return (formGroup: FormGroup) => {
			const control = formGroup.controls[controlName];
			const matchingControl = formGroup.controls[matchingControlName];
			if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
				return
			}
			if (control.value !== matchingControl.value) {
				matchingControl.setErrors({mustMatch: true})
			} else {
				matchingControl.setErrors(null)
			}
		}
	}

	showPassword() {
		this.isText = !this.isText;
		this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
		this.isText ? this.type = "text" : this.type = "password"
	}

	onSubmit() {
		if (this.registerForm.valid) {
			this.supabaseService.register(this.registerForm.value).then((user) => {
				this.registerForm.reset();
				this.loading = true;
				this.succesfullRegisterNotification();
				this.router.navigateByUrl('login');
			})
		} else {
			// console.log("form is not valid")
			Validateformfields.validateFormFields(this.registerForm)
			alert("Invalid login")
		}
	}

	succesfullRegisterNotification(){
		this.notifyService.showSuccess("Please check your mailbox to confirm your account", "Welcome to Honey")
	}
}
