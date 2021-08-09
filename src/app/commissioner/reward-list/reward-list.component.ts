import {Component, OnDestroy, OnInit} from '@angular/core';
import {Reward} from "../../models";
import {RewardsService} from "../../service/rewards.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reward',
  templateUrl: './reward-list.component.html',
  styleUrls: ['./reward-list.component.css']
})
export class RewardListComponent implements OnInit, OnDestroy {

  rewards: Reward[];
  rewardSubscription: Subscription;

  constructor(private rewardService: RewardsService, private router: Router) {
  }

  ngOnInit(): void {
    this.rewardSubscription = this.rewardService.rewardsList.subscribe(rewards => this.rewards = rewards);
  }

  ngOnDestroy() {
    this.rewardSubscription.unsubscribe();
  }

  onEditClick(id: string) {
    this.router.navigate(['/commissioner','rewards','edit-rewards', id]);
  }

}
