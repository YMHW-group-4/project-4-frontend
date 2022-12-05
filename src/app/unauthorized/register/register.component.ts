import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validateformfields from "../../helpers/validateformfields";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	type: string = "password"
	isText: boolean = false
	eyeIcon: string = "fa-eye-slash"
	registerForm: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit(): void{
		this.registerForm = this.fb.group({
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	showPassword(){
		this.isText = !this.isText;
		this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
		this.isText ? this.type = "text" : this.type = "password"
	}

	onSubmit(){
		if (this.registerForm.valid) {
			//	send to db
			console.log(this.registerForm.value)
		} else {
			console.log("form is not valid")
			Validateformfields.validateFormFields(this.registerForm)
			alert("Invalid login")
		}
	}


}
