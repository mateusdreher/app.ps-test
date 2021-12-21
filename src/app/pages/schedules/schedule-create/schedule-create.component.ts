import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { ScheduleInterface } from 'src/app/interfaces/schedule.interface';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.scss']
})
export class ScheduleCreateComponent implements OnInit {
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

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
  }

  validPhoneInput(event: any) {
    const newPhone = event.target.value.trim();

    if(event.keyCode === 13) {
      if (newPhone.length !== 11) {
        this.phoneError.error = true;
        this.phoneError.message = 'Formato de telefone inválido';
        return
      }
      if (newPhone.length === 11) {
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
    if (this.form.controls.date.value === '') {
      this.form.value.date = new Date();
    }


    if (!this.form.valid || this.phoneChips.length === 0) {
      alert('ERRO');
      console.log(this.form, this.form.valid)
      return;
    }

    this.newSchedule = {
      id: 0,
      message: this.form.value.message,
      send_at_date: this.form.value.date,
      send_at_time: this.form.value.time,
      phones: this.form.value.phones
    };

    this.scheduleService.create(this.newSchedule).subscribe(
      (success) => {
        alert(success.message);
      },
      (error) => {
        alert(error.message);
      }
    )
  }
}
