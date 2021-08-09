import {Component, OnInit} from '@angular/core';
import {PointsService} from "../../service/points.service";

@Component({
  selector: 'app-give-points',
  templateUrl: './give-points.component.html',
  styleUrls: ['./give-points.component.css']
})
export class GivePointsComponent implements OnInit {

  points: number = 0;

  constructor(private pointService: PointsService) {
  }

  ngOnInit(): void {
  }

  /**
   * This function is used to submit the score.
   */
  onFormSubmit() {
    if (this.points >= 5) {
      this.pointService.updatePoints(this.points);
      alert('Successfully added points');
    } else {
      alert('Please add minimum 5 points');
    }
  }

  /**
   * This function added 5 points  to existing on button click.
   */
  addPoints() {
    this.points = this.points + 5;
  }

  /**
   * This function removes 5 point from existing on button click.
   */
  removePoints() {
    if (this.points >= 5) {
      this.points = this.points - 5;
    }
  }

}
