import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
 imports: [RouterModule], // Import du RouterModule pour routerLink et router-outlet
})
export class AppComponent {}
