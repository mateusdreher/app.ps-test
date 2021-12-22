import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseInterface } from '../shared/interfaces/response.interface';
import { ScheduleInterface } from '../shared/interfaces/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  returnLocalStorage: string | null = '';
  schedules: ScheduleInterface[] = [];
  constructor() { }

  list(): Observable<ScheduleInterface[]> {
    this.getShcedulesAlreayInStorage();

    return of(this.schedules);
  }

  getById(id: number):Observable<ScheduleInterface> {
    this.getShcedulesAlreayInStorage();

    const ret = this.schedules.filter((item) => item.id === id);

    return of(ret[0]);
  }

  create(schedule: ScheduleInterface): Observable<ResponseInterface> {
    try {
      this.getShcedulesAlreayInStorage();

      schedule.id = this.schedules.length > 0 ? this.schedules[this.schedules.length - 1].id + 1 : 0;
      this.schedules.push(schedule);
      console.log(this.schedules)
      this.saveLocalStorage();

      const ret: ResponseInterface = {
        status: 'success',
        data: this.schedules,
        message: 'Sucesso ao agendar o SMS',
      };

      return of(ret);
    }
    catch (error) {
      const ret: ResponseInterface = {
        status: 'error',
        data: error,
        message: 'Erro ao criar agendamento'
      }

      return of(ret);
    }
  }

  update(schedule: ScheduleInterface): Observable<ResponseInterface> {
      
    try {
      this.getShcedulesAlreayInStorage();
      const scheduleToUpdate = this.schedules.filter((item) => item.id === schedule.id);
      
      if (scheduleToUpdate.length === 0) {
        const ret: ResponseInterface = {
          status: 'error',
          data: {},
          message: 'Agendamento não encontrado'
        }

        return of(ret);
      }

      this.schedules = this.schedules.map((item) => {
        if (item.id === schedule.id) {
          item = schedule;
        }
        return item;
      });

      this.saveLocalStorage();

      const ret: ResponseInterface = {
        status: 'success',
        data: this.schedules,
        message: 'Sucesso ao atualizar o agendamento'
      };

      return of(ret);
    }
    catch(error) {
      const ret: ResponseInterface = {
        status: 'error',
        data: error,
        message: 'Erro ao atualizar agendamento'
      }
      return of(ret);
    }

  }

  delete(id: number): Observable<ResponseInterface> {

    try {
      this.getShcedulesAlreayInStorage();

      this.schedules = this.schedules.filter((item) => item.id !== id);

      this.saveLocalStorage();
      
      const ret: ResponseInterface = {
        status: 'success',
        data: this.schedules,
        message: 'Sucesso ao deletar agendamento'
      }
      return of(ret);
      
    }
    catch(error) {
      const ret: ResponseInterface = {
        status: 'error',
        data: error,
        message: 'Erro ao deletar agendamento'
      }
      return of(ret);
    }
  }

  getShcedulesAlreayInStorage() {
    this.returnLocalStorage = localStorage.getItem('schedules');
    if (this.returnLocalStorage && this.returnLocalStorage !== '') {
      this.schedules = JSON.parse(this.returnLocalStorage);
    }
  }

  saveLocalStorage() {
    localStorage.setItem('schedules', JSON.stringify(this.schedules));
  }
}
