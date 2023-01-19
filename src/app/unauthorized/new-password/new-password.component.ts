import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";
import Validateformfields from "../../helpers/validateformfields";

@Component({
	selector: 'app-new-password',
	templateUrl: './new-password.component.html',
	styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {

	type: string = "password"
	isText: boolean = false
	eyeIcon: string = "fa-eye-slash"

	newForm = this.formBuilder.group({
			password: ['',
				[Validators.required,
					Validators.minLength(6)]
			],
			confirmedpassword: ['', Validators.required],
		},
		{
			validators: this.mustMatch('password', 'confirmedpassword')
		})

	constructor(
		private readonly formBuilder: FormBuilder,
		private supabaseService: SupabaseService
	) {
	}

	// public resetPassword(email: string) {
	// 	this.supabaseService.resetPassword(email)
	// }

	onSubmit() {
		if (this.newForm.valid) {
			///
		} else {
			console.log("form is not valid")
			Validateformfields.validateFormFields(this.newForm)
			alert("Invalid password")
		}
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
}
