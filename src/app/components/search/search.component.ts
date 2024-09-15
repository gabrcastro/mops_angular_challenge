import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;
    this.searchService.search(searchTerm);
  }
}
