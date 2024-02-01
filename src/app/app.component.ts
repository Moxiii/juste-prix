import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class AppComponent {
  title = 'Juste-Prix';
  joueur1: string = '';
  joueur2: string = '';
  objet: string = '';
  valeur: number | null = null;
  tentative: number = 0;
  guess: number | null = null;
  currentPlayer: string = '';
  gameStarted: boolean = false;
  gameFinished: boolean = false;
  playersEntered: boolean = false;
  scores: { joueur: string; tentatives: number; objet: string; valeur: number }[] = [];
  showGuessResult: boolean = false;
  resultText: string = '';
  currentObject: string = '';
  currentObjectValue: number = 0;


  startGame() {
    if (this.joueur1 && this.joueur2 && this.objet && this.valeur !== null) {
      this.gameStarted = true;
      this.currentObject = this.objet;
      this.currentObjectValue = this.valeur;
    }
  }
  enterPlayers() {
    if (this.joueur1 && this.joueur2) {
      this.playersEntered = true;
      this.chooseRandomStartingPlayer();
    }
  }


  playGuess() {
    this.tentative++;

    if (this.guess === null) {
      // Si la valeur est nulle, la tentative ne compte pas
    } else if (this.valeur !== null) {
      if (this.guess > this.valeur) {
        // La valeur proposée est supérieure
        this.showGuessResult = true;
        this.resultText = 'Trop grand';
        console.log(this.resultText)
      } else if (this.guess < this.valeur) {
        // La valeur proposée est inférieure
        this.showGuessResult = true;
        this.resultText = 'Trop petit';
        console.log(this.resultText)
      } else {
        // Félicitations, c'est un juste prix !
        this.scores.push({
          joueur: this.currentPlayer,
          tentatives: this.tentative ,
          objet: this.currentObject,
          valeur: this.currentObjectValue});
        if (!this.gameFinished) {
          // Si le jeu n'est pas encore terminé
          this.switchCurrentPlayer(); // Changer de joueur
        }

        // Vérifier si les deux joueurs ont trouvé la valeur
        if (this.scores.length === 2) {
          this.gameFinished = true; // Marquer le jeu comme terminé
        }
      }
    }
    // Réinitialisation
    this.guess = null;

  }


  restartGame() {
    this.joueur1 = '';
    this.joueur2 = '';
    this.objet = '';
    this.valeur = null;
    this.tentative = 0;
    this.guess = null;
    this.gameStarted = false;
    this.gameFinished = false;
    this.playersEntered = false;
    this.showGuessResult = false;
    this.currentPlayer = '';
    this.currentObject = '';
    this.currentObjectValue = 0;
  }
  restartGameWithSamePlayers() {
    if (this.joueur1 && this.joueur2) {
      this.gameStarted = false;
      this.gameFinished = false;
      this.tentative = 0;
      this.guess = null;
      this.scores = [];
      this.showGuessResult = false;
      const randomIndex = Math.floor(Math.random() * 2);
      this.currentPlayer = randomIndex === 0 ? this.joueur1 : this.joueur2;
      this.currentObject = '';
      this.currentObjectValue = 0;
    }
  }

  switchCurrentPlayer() {
    // Basculez entre les joueurs
    this.currentPlayer = (this.currentPlayer === this.joueur1) ? this.joueur2 : this.joueur1;
    this.tentative = 0;

  }
  chooseRandomStartingPlayer() {
    const randomIndex = Math.floor(Math.random() * 2);
    this.currentPlayer = randomIndex === 0 ? this.joueur1 : this.joueur2;
  }
}
