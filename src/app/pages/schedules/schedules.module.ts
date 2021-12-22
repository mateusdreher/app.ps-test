import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';

export const options: Partial<IConfig> | null | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    ScheduleListComponent,
    ScheduleFormComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    SharedModule,
  ]
})
export class SchedulesModule { }
