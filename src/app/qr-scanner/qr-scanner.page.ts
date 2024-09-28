import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { GeolocationService } from '../services/geolocation.service';
import { QrScannerService } from '../services/qr-scanner.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  scannedData: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private geolocationService: GeolocationService,
    private qrScannerService: QrScannerService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.scanCode();
  }

  async scanCode() {
    try {
      const barcodeData = await this.barcodeScanner.scan();
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;

      const position = await this.geolocationService.getCurrentPosition();
      const qrCodeData = {
        text: barcodeData.text,
        format: barcodeData.format,
        latitude: position.coords.latitude, // Accéder via coords
        longitude: position.coords.longitude // Accéder via coords
      };

      this.qrScannerService.registerQrCode(qrCodeData).subscribe(
        (response) => {
          console.log('QR Code enregistré:', response);
          this.presentAlert('Succès', 'Le QR code a été enregistré avec succès.');
          this.scanCode(); // Rescan automatically
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du QR code:', error);
          this.presentAlert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du QR code.');
        }
      );
    } catch (err) {
      console.log('Error', err);
      this.presentAlert('Erreur', `Erreur: ${err}`);
    }
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
