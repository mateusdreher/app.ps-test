import { Component, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
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

  constructor(
    private scheduleService: ScheduleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getSchdules();
  }


  getSchdules() {
    this.scheduleService.list().subscribe(
      (success) => {
        this.schedules = success;
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

  async removeSchedule(id: number) {
    (await this.alertService.confirm('Você tem certeza?', 'Você não poderá desfazer essa ação', 'DELETAR')).subscribe(
      (success) => {
        if (success.isConfirmed) {
          this.scheduleService.delete(id).subscribe(
            (success) => {
              this.alertService.success('Sucesso', 'Agendamento excluído com sucesso', 'FECHAR');
              this.getSchdules();
            },
            (error) => {
              this.alertService.error('Erro', 'Não foi possível excluir o agendamento', 'FECHAR');
            }
          );
        }
      }
    )
  }

  eventForm(event: any) {
    if (event === 'update') {
      this.getSchdules();
    }
    this.showScheduleForm = false;
  }
}
