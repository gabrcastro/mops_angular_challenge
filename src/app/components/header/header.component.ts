import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoPath: string = 'assets/images/logo.png';
  logoAlt: string = 'Logo Rick and Morty';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obter o caminho completo da URL ativa
    const fullPath = this.route.snapshot.url
      .map((segment) => segment.path)
      .join('/');
    console.log('Caminho completo da rota ativa:', fullPath);

    // Para obter parâmetros da rota ativa
    this.route.params.subscribe((params) => {
      console.log('Parâmetros da rota ativa:', params);
    });
  }
}
