import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type Character = {
  image?: string | undefined | null;
  name: string;
  type: string;
  favorite: boolean;
};

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() public image: string = '';
  @Input() public name: string = '';
  @Input() public type: string = '';
  @Input() public favorite: boolean = false;
}
