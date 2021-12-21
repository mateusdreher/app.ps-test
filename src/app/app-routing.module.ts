import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulesModule } from './pages/schedules/schedules.module';

const routes: Routes = [
  { 
    path: 'schedule', loadChildren: () => import('./pages/schedules/schedules.module').then(mod => mod.SchedulesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
