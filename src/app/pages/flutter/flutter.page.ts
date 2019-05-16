import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: "app-flutter",
  templateUrl: "./flutter.page.html",
  styleUrls: ["./flutter.page.scss"]
})
export class FlutterPage implements OnInit {
  constructor(private loadingController: LoadingController) {}

  ngOnInit() {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Hola",
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log("loading demiss");
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: "Please wait...",
      translucent: true,
      cssClass: "custom-class custom-loading"
    });
    return await loading.present();
  }
}
