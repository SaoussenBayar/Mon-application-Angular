import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importez CommonModule ici
import { FormsModule } from '@angular/forms'; // Importez FormsModule ici


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
  ],
  standalone: true
  
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Fonction appelée lors de la soumission du formulaire de connexion
  apiLogin(): void {
    console.log('URL utilisée pour l\'API:', this.authService.apiUrl);  // Vérifiez l'URL de l'API

    // Appelez la méthode de connexion de votre service d'authentification
    this.authService.apiLogin(this.email, this.password).subscribe(
      response => {
        console.log('API response:', response);

        const token = response.token; // Récupérer le token JWT de la réponse

        // Stockez le token dans localStorage pour qu'il soit disponible globalement
        localStorage.setItem('authToken', token);
        console.log('Token stocké dans localStorage:', token);

        // Optionnellement, vous pouvez aussi le stocker dans le service si vous en avez besoin
        this.authService.setAuthToken(token);

        // Redirigez l'utilisateur vers la page de modération
        this.router.navigate(['/moderation']);
      },
      error => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
