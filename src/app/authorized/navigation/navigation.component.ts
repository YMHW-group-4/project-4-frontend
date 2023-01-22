import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {NotificationService} from "../../services/notification.service";


@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  ngOnInit(): void {
  }

	constructor(
		private supabaseService: SupabaseService,
		private notifyService: NotificationService
	) {

	}

	public signOut() {
		this.signOutNotification();
		this.supabaseService.signOut()
	}


	signOutNotification() {
		this.notifyService.showInfo("Hope to see you again soon", "See ya!")
	}
}
