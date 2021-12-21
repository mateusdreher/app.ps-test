import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

const routes: Routes = [
  { path: 'create', component: ScheduleCreateComponent },
  { path: 'list', component: ScheduleListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule { }
