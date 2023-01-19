<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import {SupabaseService} from "../../services/supabase.service";
=======
=======
import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {NotificationService} from "../../services/notification.service";
>>>>>>> Stashed changes
>>>>>>> Stashed changes

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

<<<<<<< Updated upstream
  constructor(
	  private supabaseService: SupabaseService
  ) { }

	public signOut(){
		this.supabaseService.signOut()
=======
<<<<<<< Updated upstream
  constructor() { }

  ngOnInit(): void {
  }
=======
	constructor(
		private supabaseService: SupabaseService,
		private notifyService: NotificationService
	) {
>>>>>>> Stashed changes
	}

	public signOut() {
		this.signOutNotification();
		this.supabaseService.signOut()
	}
>>>>>>> Stashed changes

	signOutNotification() {
		this.notifyService.showInfo("Hope to see you again soon", "See ya!")
	}
}
