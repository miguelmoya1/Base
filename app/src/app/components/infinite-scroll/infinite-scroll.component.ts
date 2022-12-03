import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-4 p-4" [ngClass]="{ 'overflow-y-scroll': horizontal }">
      <ng-content></ng-content>
    </div>
  `,
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() horizontal = false;
  @Output() fetchMore = new EventEmitter<void>();

  private SPACE = 50;

  private firstLoad = true;

  constructor() {} 

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    if (!this.firstLoad) {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (clientHeight + scrollTop >= scrollHeight - this.SPACE) {
        this.fetchMore.emit();
      }
    } else {
      this.firstLoad = false;
    }
  }
}
