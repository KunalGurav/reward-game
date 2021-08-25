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
    this.rewardService.fetchRewards().subscribe();
  }

  ngOnDestroy() {
    this.rewardSubscription.unsubscribe();
  }

  onEditClick(id: string) {
    this.router.navigate(['/commissioner','rewards','edit-rewards', id]);
  }

  onDeleteClick(id: string) {
    if(confirm('Deleting rewards would be unfair to the players. Do you still want to delete ?')){
      this.rewardService.deleteRewards(id).subscribe();
    }
  }

}
