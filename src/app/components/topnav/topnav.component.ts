import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  @Input()
  userEmail: string;

  @Input()
  isloggedIn: boolean;

  constructor(
    private as: AuthService,
    private router: Router
  ) { }

  ngOnInit() {


  }

  onLoggedOut(event){
    event.preventDefault();
    this.isloggedIn = false;
    this.as.logout();
    window.location.reload();
  }

}
