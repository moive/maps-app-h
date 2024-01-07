import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'counter-alone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-alone.component.html',
  styleUrls: ['./counter-alone.component.scss'],
})
export class CounterAloneComponent {
  @Input() counter: number = 10;

  increment() {
    this.counter++;
  }
  decrement() {
    this.counter--;
  }
}
