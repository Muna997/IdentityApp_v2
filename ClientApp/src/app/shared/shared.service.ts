import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponse } from './models/ApiResponse';
import { Model } from './components/model/model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private modalService = inject(NgbModal);

  showNotification(response: ApiResponse<any>) {
    const modalRef = this.modalService.open(Model);
    modalRef.componentInstance.title = response.title;
    modalRef.componentInstance.message = response.message;
    modalRef.componentInstance.errors = response.errors;
  }
}
