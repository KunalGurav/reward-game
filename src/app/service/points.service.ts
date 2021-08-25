import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  points: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('point')) {
      const point = +localStorage.getItem('point');
      this.points = new BehaviorSubject<number>(point);
    } else {
      this.points = new BehaviorSubject<number>(0);
    }
  }

  /**
   * This function is used to retrieve the points from the firebase.
   */
  fetchPoints() {
    return this.http.get(`${environment.DOMAIN_URL}/points.json`).pipe(map(resp => {
      console.log('Points Response: ', resp);
      if (typeof resp === "number") {
        localStorage.setItem('point', resp.toFixed(0));
        this.points.next(resp);
      }
    }));
  }

  /**
   * This function is used to update points.
   * @param points: number, points to be added.
   */
  updatePoints(points: number) {
    const totalPoints = this.points.value + points;
    return this.http.put(`${environment.DOMAIN_URL}/points.json`, totalPoints).pipe(map( resp => {
      console.log('Updated Points');
      localStorage.setItem('point', totalPoints.toFixed(0));
      this.points.next(totalPoints);
    }));
  }
}
