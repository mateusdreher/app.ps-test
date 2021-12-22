import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(title: string, text: string, confirmButtonText: string) {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText
    });
  }

  error(title: string, text: string, confirmButtonText: string) {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText
    });
  }

  confirm(title: string, text: string, confirmButtonText: string):  Promise<Observable<SweetAlertResult>> {
   return  Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText,
      cancelButtonText: 'Não, cancele',
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#f44336'
    })
    .then((result) => {
      return of(result)
    })
    .catch((error) => {
      return of(error)
    })

  }
}
