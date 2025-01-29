import { Routes } from '@angular/router';
import { ModerationComponent } from './moderation/moderation.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut
  { path: 'moderation', component: ModerationComponent },
  { path: 'login', component: LoginComponent },
];