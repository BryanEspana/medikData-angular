import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userRole = '';

  constructor() {}

  ngOnInit() {
    // Retrieve the user's role from local storage
    const role = localStorage.getItem('profile_role');
    if (role !== null) {
      this.userRole = role!;
    }
  }

}