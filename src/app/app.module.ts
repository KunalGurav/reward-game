import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {RewardScreenComponent} from './reward-screen/reward-screen.component';
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {
    path: 'commissioner',
    loadChildren: () => import("./commissioner/commissioner.module").then(m => m.CommissionerModule)
  },
  {path: '', component: RewardScreenComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RewardScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
