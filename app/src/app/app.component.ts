import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="container m-auto">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  title = 'Rating';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
