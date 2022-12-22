import { Injectable } from '@angular/core';
import {TempBackendService} from "./temp-backend.service";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

	constructor(private tempBackend: TempBackendService) {
	}

	register(username: string, password: string): Promise<User> {
		return this.tempBackend.get('user', {username, password});
	}}
