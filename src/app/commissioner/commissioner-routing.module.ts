import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GivePointsComponent} from "./give-points/give-points.component";
import {RewardScreenComponent} from "../reward-screen/reward-screen.component";
import {CommissionerComponent} from "./commissioner/commissioner.component";
import {RewardFormComponent} from "./reward-form/reward-form.component";

const routes: Routes = [
  {path: 'give-points', component: GivePointsComponent},
  {
    path: 'rewards', component: RewardScreenComponent, children: [
      {path: 'add-rewards', component: RewardFormComponent},
      {path: 'edit-rewards', component: RewardFormComponent},
    ]
  },
  {path: '', component: CommissionerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionerRoutingModule {
}
