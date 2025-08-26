import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-management-frontend';
  darkMode = false;

  constructor() {
    try {
      const stored = localStorage.getItem('darkMode');
      this.darkMode = stored === '1';
      const root = document.documentElement;
      if (this.darkMode) {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
    } catch {}
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    const root = document.documentElement;
    if (this.darkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    try { localStorage.setItem('darkMode', this.darkMode ? '1' : '0'); } catch {}
  }
}
