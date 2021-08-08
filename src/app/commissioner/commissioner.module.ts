import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionerRoutingModule } from './commissioner-routing.module';
import { CommissionerComponent } from './commissioner/commissioner.component';
import { RewardListComponent } from './reward-list/reward-list.component';
import { GivePointsComponent } from './give-points/give-points.component';
import { RewardFormComponent } from './reward-form/reward-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CommissionerComponent,
    RewardListComponent,
    GivePointsComponent,
    RewardFormComponent
  ],
    imports: [
        CommonModule,
        CommissionerRoutingModule,
        ReactiveFormsModule
    ]
})
export class CommissionerModule { }
