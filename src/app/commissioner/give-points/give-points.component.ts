import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-give-points',
  templateUrl: './give-points.component.html',
  styleUrls: ['./give-points.component.css']
})
export class GivePointsComponent implements OnInit {

  points: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  addPoints() {
    this.points = this.points + 5;
  }

  removePoints() {
    if (this.points >= 5) {
      this.points = this.points - 5;
    }
  }

}
