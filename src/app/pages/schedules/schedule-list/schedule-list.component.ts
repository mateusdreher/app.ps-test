import { Component, OnInit, Output } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ScheduleInterface } from 'src/app/shared/interfaces/schedule.interface';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  schedules: ScheduleInterface[] = [];
  hidden: boolean = true;
  editSchedule: boolean = false;
  idToEdit: number = 0;
  showScheduleForm: boolean = false;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.getSchdules();
  }


  getSchdules() {
    this.scheduleService.list().subscribe(
      (success) => {
        this.schedules = success;
        console.log(success);
      },
      (error) => {
        alert('Erro ao recuperar lista de coisas legais')
      }
    )
  }

  showFormCreate() {
    this.showScheduleForm = true;
    this.editSchedule = false;
    this.idToEdit = 0;
  }

  showFormEdit(id: number) {
    this.idToEdit = id;
    this.editSchedule = true;
    this.showScheduleForm = true;
  }

  removeSchedule(id: number) {
    this.scheduleService.delete(id).subscribe(
      (success) => {
        alert(success.message);
      },
      (error) => {
        alert(error.message)
      }
    )
  }
}
