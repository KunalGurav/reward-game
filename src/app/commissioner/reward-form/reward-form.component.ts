import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RewardsService} from "../../service/rewards.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-reward-form',
  templateUrl: './reward-form.component.html',
  styleUrls: ['./reward-form.component.css']
})
export class RewardFormComponent implements OnInit {

  rewardsForm: FormGroup;
  isFormSubmitted: boolean;
  idForEdit: string;

  constructor(
    private rewardService: RewardsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.rewardsForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      pointsNeeded: new FormControl(null, Validators.required)
    });
    if (this.router.url.includes('edit-rewards')) {
      this.idForEdit = this.route.snapshot.paramMap.get('id');
      console.log('ID:', this.idForEdit);
      this.patchValues();
    }
  }

  /**
   * This function is used to submit the form based on the state.
   */
  onFormSubmit() {
    this.isFormSubmitted = true;
    if (this.rewardsForm.valid) {
      if (this.idForEdit) {
        this.rewardService.editRewards({id: this.idForEdit, ...this.rewardsForm.value});
        this.rewardsForm.reset();
        this.idForEdit = null;
        this.isFormSubmitted = false;
        this.location.back();
      } else {
        this.rewardService.addRewards({...this.rewardsForm.value});
        this.rewardsForm.reset();
        this.isFormSubmitted = false;
        this.location.back();
      }
    }
  }

  /**
   * This function is used to patch edit values to the form.
   */
  patchValues() {
    const reward = this.rewardService.getRewardsFromId(this.idForEdit);
    if (reward)
      this.rewardsForm.patchValue({
        title: reward.title,
        description: reward.description,
        pointsNeeded: reward.pointsNeeded
      });
  }

}
