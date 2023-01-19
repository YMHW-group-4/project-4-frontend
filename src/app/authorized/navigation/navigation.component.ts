import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
	  private supabaseService: SupabaseService
  ) { }

	public signOut(){
		this.supabaseService.signOut()
	}

}
