// src/app/services/commentaire.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private apiUrl = 'http://localhost:8000/api/commentaire'; // Base URL des API
  constructor(private http: HttpClient) { }
  // Récupérer tous les commentaires à modérer
  getCommentaires(): Observable<any[]> {
    const token = localStorage.getItem('authToken');  // Récupérer le token stocké dans localStorage

    console.log('Token récupéré depuis localStorage:', token);  // Log du token pour s'assurer qu'il est bien récupéré

    if (!token) {
      console.error('Aucun token trouvé dans localStorage!');
      return new Observable();  // Retourne un observable vide si aucun token n'est trouvé
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Ajoutez le token dans l'en-tête de la requête
    });

    return this.http.get<any[]>(`${this.apiUrl}s`, { headers });

  }

  // Approuver un commentaire
  approuverCommentaire(commentaireId: number): Observable<any> {

  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(`${this.apiUrl}/${commentaireId}/approuver`, {}, { headers });
  }

  // Supprimer un commentaire
  supprimerCommentaire(commentaireId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.delete(`${this.apiUrl}/${commentaireId}/supprimer`, { headers });  }
}
