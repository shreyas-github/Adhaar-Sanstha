import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() loading = false;
  @Input() message = 'Loading...';
  @Input() size = 'normal'; // 'small', 'normal', 'large'

  getSpinnerSize(): string {
    switch (this.size) {
      case 'small': return '30px';
      case 'large': return '80px';
      default: return '50px';
    }
  }
} 