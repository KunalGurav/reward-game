import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  points: BehaviorSubject<number>;

  constructor() {
    if (localStorage.getItem('point')) {
      const point = +localStorage.getItem('point');
      this.points = new BehaviorSubject<number>(point);
    } else {
      this.points = new BehaviorSubject<number>(0);
    }
  }

  /**
   * This function is used to update points.
   * @param points
   */
  updatePoints(points: number) {
    const currentPoints = this.points.value;
    const totalPoints = this.points.value + points;
    localStorage.setItem('point', totalPoints.toFixed(0));
    this.points.next(totalPoints);
  }
}
