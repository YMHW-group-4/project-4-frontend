import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {NotificationService} from "../../services/notification.service";
import {ApiService} from "../../services/api.service";


@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
	public connectedNode: string = '';

  ngOnInit(): void {
	  this.apiservice.getNode().then((node) => {
		  this.connectedNode = node;
	  })
  }

	constructor(
		private supabaseService: SupabaseService,
		private notifyService: NotificationService,
		private apiservice: ApiService,
	) {

	}

	public signOut() {
		this.signOutNotification();
		this.supabaseService.signout();
	}


	signOutNotification() {
		this.notifyService.showInfo("Hope to see you again soon", "See ya!")
	}
}
