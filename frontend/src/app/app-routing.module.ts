import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { RetentionDashboardComponent } from './routes/retention-dashboard/retention-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'retention', component: RetentionDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
