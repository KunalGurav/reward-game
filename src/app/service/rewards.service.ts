import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Reward} from "../models";

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  rewardsList: BehaviorSubject<Reward[]>

  constructor() {
    const rewardString = localStorage.getItem('rewards');
    if (rewardString) {
      const rewards = JSON.parse(rewardString);
      this.rewardsList = new BehaviorSubject<Reward[]>(rewards);
    } else {
      this.rewardsList = new BehaviorSubject<Reward[]>([]);
    }
  }

  addRewards(reward: Reward) {
    const tempRewards = [...this.rewardsList.value];
    tempRewards.push({id: new Date().toDateString(), ...reward});
    localStorage.setItem('rewards', JSON.stringify(tempRewards));
    this.rewardsList.next(tempRewards);
  }

  editRewards(reward: Reward) {
    const tempRewards = [...this.rewardsList.value];
    const index = tempRewards.findIndex(item => item.id === reward.id);
    console.log(index);
    console.log('Rewards in edit', reward);
    if (index >= 0 && index <= tempRewards.length - 1) {
      tempRewards[index] = reward;
    }
    localStorage.setItem('rewards', JSON.stringify(tempRewards));
    this.rewardsList.next(tempRewards);
  }

  getRewardsFromId(id: string): Reward {
    const tempRewards = [...this.rewardsList.value];
    console.log('Rewards: ', tempRewards);
    const selectedReward = tempRewards.find(item => item.id == id);
    return selectedReward;
  }

}
