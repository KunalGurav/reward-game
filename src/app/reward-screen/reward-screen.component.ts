import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reward-screen',
  templateUrl: './reward-screen.component.html',
  styleUrls: ['./reward-screen.component.css']
})
export class RewardScreenComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * Redirect to commissioner login.
   */
  goToCommissionerPage() {
    this.router.navigate(['/commissioner']);
  }

}
