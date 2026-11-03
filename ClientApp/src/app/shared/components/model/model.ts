import { Component, input, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-model',
  imports: [],
  templateUrl: './model.html',
  styleUrl: './model.scss',
})
export class Model {
  @Input() title?: string;
  @Input() message?: string;
  @Input() errors?: string[] | null;
  constructor(public activeModal: NgbActiveModal) {}
}
