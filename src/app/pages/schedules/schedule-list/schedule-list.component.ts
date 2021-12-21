import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.getSchdules();
  }


  getSchdules() {
    this.scheduleService.list().subscribe(
      (success) => {

      },
      (error) => {

      }
    )
  }
}
