import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { CommentaireService } from '../services/commentaire.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moderation',
  standalone: true, // Déclare que le composant est autonome
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.css'],
  imports: [HttpClientModule, CommonModule] // Ajoutez HttpClientModule ici
})
export class ModerationComponent implements OnInit {

  commentaires: any[] = []; // Liste des commentaires

  constructor(private commentaireService: CommentaireService) { }

  ngOnInit(): void {
    this.loadCommentaires(); // Charger les commentaires à l'initialisation du composant
  }

  loadCommentaires(): void {
    this.commentaireService.getCommentaires().subscribe(data => {
      this.commentaires = data; // Récupérer les commentaires depuis l'API
    });
  }

  approuver(commentaireId: number): void {
    this.commentaireService.approuverCommentaire(commentaireId).subscribe(response => {
      console.log(response.message);
      this.loadCommentaires(); // Recharger les commentaires après approbation
    });
  }

  supprimer(commentaireId: number): void {
    this.commentaireService.supprimerCommentaire(commentaireId).subscribe(response => {
      console.log(response.message);
      this.loadCommentaires(); // Recharger les commentaires après suppression
    });
  }
}
