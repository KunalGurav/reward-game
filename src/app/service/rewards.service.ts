import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Reward} from "../models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {REWARDS} from "../api-constants";

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  rewardsList: BehaviorSubject<Reward[]>

  constructor(private http: HttpClient) {
    const rewardString = localStorage.getItem('rewards');
    if (rewardString) {
      const rewards = JSON.parse(rewardString);
      this.rewardsList = new BehaviorSubject<Reward[]>(rewards);
    } else {
      this.rewardsList = new BehaviorSubject<Reward[]>([]);
    }
  }

  /**
   * Fetch rewards from the firebase server
   */
  fetchRewards(): Observable<Reward[]> {
    return this.http.get(`${environment.DOMAIN_URL}${REWARDS}.json`).pipe(
      map((resp: { [key: string]: Reward }) => {
        if (resp) {
          const tempRewards = [];
          for (const [key, value] of Object.entries(resp)) {
            let reward: Reward;
            reward = {
              id: key,
              description: value.description,
              pointsNeeded: value.pointsNeeded,
              title: value.title
            };
            tempRewards.push(reward);
            // console.log(item, index);
          }
          this.rewardsList.next([...tempRewards]);
          return tempRewards;
        }
      })
    );
  }

  /**
   * This function is used to add new rewards to the firebase.
   * @param reward: New Reward to be added.
   */
  addRewards(reward: Reward) {
    return this.http.post(`${environment.DOMAIN_URL}${REWARDS}.json`, reward).pipe(
      map((resp: { name: string }) => {
        console.log(resp.name);
        const tempRewards = [...this.rewardsList.value];
        tempRewards.push({id: resp.name, ...reward});
        localStorage.setItem('rewards', JSON.stringify(tempRewards));
        this.rewardsList.next([...tempRewards]);
      })
    );
  }

  /**
   * This function is used to remove the reward from the firebase.
   * @param rewardId: string, Id of the Reward to be deleted.
   */
  deleteRewards(rewardId: string): Observable<void> {
    return this.http.delete(`${environment.DOMAIN_URL}${REWARDS}/${rewardId}.json`).pipe(
      map(resp => {
        const tempRewards = [...this.rewardsList.value];
        const index = tempRewards.findIndex(item => item.id === rewardId);
        if (index >= 0) {
          tempRewards.splice(index, 1);
          localStorage.setItem('rewards', JSON.stringify(tempRewards));
          this.rewardsList.next([...tempRewards]);
        }
      })
    );
  }

  /**
   * This function is used to edit the existing rewards.
   * @param rewardId: Id of reward to be edited
   * @param reward: updated value of reward.
   */
  editRewards(rewardId: string, reward: Reward): Observable<void> {
    return this.http.put(`${environment.DOMAIN_URL}${REWARDS}/${rewardId}.json`, reward).pipe(
      map(resp => {
        console.log('Edit Response: ', resp);
        const tempRewards = [...this.rewardsList.value];
        const index = tempRewards.findIndex(item => item.id === rewardId);
        if (index >= 0 && index <= tempRewards.length - 1) {
          tempRewards[index] = {id: rewardId, ...reward};
        }
        localStorage.setItem('rewards', JSON.stringify(tempRewards));
        this.rewardsList.next([...tempRewards]);
      })
    )
  }

  getRewardsFromId(id: string): Reward {
    const tempRewards = [...this.rewardsList.value];
    console.log('Rewards: ', tempRewards);
    return tempRewards.find(item => item.id == id);
  }

}
