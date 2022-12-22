import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {FormBuilder, Validators} from "@angular/forms";
import Validateformfields from "../../helpers/validateformfields";

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

	resetForm = this.formBuilder.group({
		email: ['', Validators.required],
		// url: ['https://www.google.com']
		// url: ['localhost:4200/new-pw#access_token=x&refresh_token=y&expires_in=z&token_type=bearer&type=recovery']
		url: ['http://localhost:4200/new-pw/']
	})

	constructor(
		private readonly formBuilder: FormBuilder,
		private supabaseService: SupabaseService
	) {
	}

	onSubmit() {
		if (this.resetForm.valid) {
			this.supabaseService.resetPassword(this.resetForm.value)
		} else {
			console.log("form is not valid")
			Validateformfields.validateFormFields(this.resetForm)
			alert("Invalid reset")
		}
	}
}
