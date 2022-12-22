import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SupabaseService} from "./supabase.service";

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private supabaseService: SupabaseService) {
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.supabaseService.getUser().then((user) => {
			console.log(user != null, user);
			return user != null
		});
	}

}
