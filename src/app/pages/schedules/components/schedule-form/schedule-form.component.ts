import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ScheduleInterface } from 'src/app/shared/interfaces/schedule.interface';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {

  @Input() isEdit: boolean = false;
  @Input() idToEdit: number = 0;
  @Output() closeForm = new EventEmitter();

  newSchedule: ScheduleInterface = {
    id: 0,
    message: '',
    send_at_date: new Date(),
    send_at_time: '',
    phones: []
  }
  form: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    phones: new FormControl([], Validators.minLength(1)),
    date: new FormControl(''),
    time: new FormControl('', Validators.required)
  });

  phoneChips: string[] = [];
  phoneError = {
    error: false,
    message: ''
  };

  constructor(
    private scheduleService: ScheduleService,
    private alertService: AlertService
    ) {}

  ngOnInit(): void {
    if(this.isEdit) {
      this.prepareToEdit();
    }
  }

  prepareToEdit() {
    this.scheduleService.getById(this.idToEdit).subscribe(
      (success) => {
        this.newSchedule.message = success.message;
        this.newSchedule.send_at_date = success.send_at_date;
        this.newSchedule.send_at_time = success.send_at_time;

        this.phoneChips = success.phones;
      },
      (error) => {

      }
    );
  }

  validPhoneInput(event: any) {
    const newPhone = event.target.value.trim();

    if(event.keyCode === 13) {
      if (newPhone.length !== 11) {
        this.phoneError.error = true;
        this.phoneError.message = 'Formato de telefone inválido';
        return
      }
      else {
        this.phoneError.error = false;
        this.phoneError.message = '';
      }

      this.addPhone(newPhone);
      event.target.value = '';
      return;
    }
  }

  addPhone(phone: string) {
    this.phoneChips.push(phone);
    this.form.value.phones = this.phoneChips;
  }

  removePhone(phone: string) {
    const index = this.phoneChips.indexOf(phone);

    this.phoneChips.splice(index, 1);
    this.form.value.phones = this.phoneChips;

  }

  submit() {
    Object.keys(this.newSchedule).forEach((key) => {
      if ((this.newSchedule as any)[key] === '' || (this.newSchedule as any)[key] === null) {
        this.alertService.error('Campo inválido', `O campo ${key} é inválido. Por favor verifique`, 'OK');
        return;
      }
    });

    if (this.phoneChips.length === 0) {
      this.alertService.error('Campo inválido', 'Deve haver pelo menos um telefone para o envio do sms', 'OK');
      return;
    }

    this.newSchedule.phones = this.phoneChips;

    if (this.isEdit) {
      this.edit();
    }
    else {
      this.create();
    }
    
  }

  create() {
    this.scheduleService.create(this.newSchedule).subscribe(
      (success) => {
        this.alertService.success('Sucesso', 'SMS agendado com sucesso', 'FECHAR');
        this.closeForm.emit('update');
      },
      (error) => {
        this.alertService.error('Erro', 'Não foi possível agendar o SMS', 'FECHAR');
      }
    );
  }

  edit() {
    this.scheduleService.update(this.newSchedule).subscribe(
      (success) => {
        this.alertService.success('Sucesso', 'Agendamento atualizazdo com sucesso', 'FECHAR');
        this.closeForm.emit('update');
      },
      (error) => {
        this.alertService.error('Erro', 'Não foi possível editar o agendamento', 'FECHAR');
      }
    )
  }

}
