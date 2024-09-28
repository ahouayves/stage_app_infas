import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  matricule: string = '';
  minLength: number = 9;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async onSubmit() {
    if (!this.matricule) {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Le matricule est obligatoire.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.matricule.length < this.minLength) {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: `Le matricule doit contenir au moins ${this.minLength} caractères.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.authService.login(this.matricule);
    this.router.navigate(['/home'], { replaceUrl: true }); // Supprime l'historique de navigation
  }


}
