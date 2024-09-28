import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';
import { StudentService } from '../services/student.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  student = {
    matricule: '',
    detail: '',
    latitude: '',
    longitude: ''
  };

  constructor(
    private geolocationService: GeolocationService,
    private studentService: StudentService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}
  ngOnInit() {
  }
  ionViewDidEnter() {
    const matricule = this.authService.getMatricule();
    if (matricule) {
      this.student.matricule = matricule;
    }

    this.geolocationService.getCurrentPosition().then((position) => {
      this.student.latitude = position.coords.latitude.toString();
      this.student.longitude = position.coords.longitude.toString();
    }).catch((error) => {
      console.error('Erreur lors de la récupération de la position:', error);
    });
  }

  onSubmit() {
    this.studentService.registerStudent(this.student).subscribe(
      (response) => {
        console.log('Rapport enregistré:', response);
        this.presentAlert('Succès', 'Le rapport a été enregistré avec succès.');
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement du rapport:', error);
        this.presentAlert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du rapport.');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
