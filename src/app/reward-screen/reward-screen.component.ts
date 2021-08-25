import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PointsService} from "../service/points.service";
import {RewardsService} from "../service/rewards.service";
import {Reward} from "../models";

@Component({
  selector: 'app-reward-screen',
  templateUrl: './reward-screen.component.html',
  styleUrls: ['./reward-screen.component.css']
})
export class RewardScreenComponent implements OnInit {

  pointsEarned: number;
  rewards: Reward[];

  constructor(private router: Router, private pointService: PointsService, private rewardService: RewardsService) {
  }

  ngOnInit(): void {
    this.pointService.fetchPoints().subscribe();
    this.pointService.points.subscribe(value => {
      this.pointsEarned = value;
    });
    this.rewardService.fetchRewards().subscribe();
    this.rewardService.rewardsList.subscribe(items => {
      const sortedItems = items.sort((a, b) => a.pointsNeeded - b.pointsNeeded);
      this.rewards = sortedItems;
    });
  }

  /**
   * Redirect to commissioner login.
   */
  goToCommissionerPage() {
    this.router.navigate(['/commissioner']);
  }

}
