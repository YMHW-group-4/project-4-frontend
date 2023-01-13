import {Injectable} from '@angular/core';
import {User} from "../models/User";
// import {TempBackendService} from "./temp-backend.service";

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	// constructor(private tempBackend: TempBackendService) {
	// }
	//
	// login(username: string, password: string): Promise<User> {
	// 	return this.tempBackend.get('user', {username, password});
	// }
}
