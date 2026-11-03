import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input() pageNumber!: number;
  @Input() totalPages!: number;
  @Output() pageChanged = new EventEmitter<number>();

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageChanged.emit(this.pageNumber + 1);
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageChanged.emit(this.pageNumber - 1);
    }
  }
}
