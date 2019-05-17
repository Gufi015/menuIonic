import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
declare var google;

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage implements OnInit, AfterViewInit {
  apikey = "AIzaSyCoX4qbPxPxgv6vsO2EYsMhSrvURx0ZU6o";
  @ViewChild("map") googleMap:ElementRef;
  mapElement: any;
  map: any;
  mapOptions: any;
  mapCenter = { lat: null, lng: null  };
  makerOptions: any = { position: null, map: null, title: null };
  marker: any;
  constructor(private geo:Geolocation) {
    const script = document.createElement('script');
    script.id = 'googleMap';

    if(this.apikey){
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apikey;
    }else{
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=";
    }
    document.head.appendChild(script);

    this.geo.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;

      console.log(this.mapCenter.lat);
      console.log(this.mapCenter.lng);
    }).catch((error) => {
      console.log('error getting locations' +error);
    });
  }

  ngOnInit(){

  }
  
  ngAfterViewInit(){
    this.mapElement = this.googleMap.nativeElement;

    this.mapOptions = {
      center: this.mapCenter,
      zoom: 17
    };


    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement, this.mapOptions);
      this.makerOptions.position = new google.maps.LatLng(this.mapCenter.lat, this.mapCenter.lng);
      this.makerOptions.map = this.map;
      this.makerOptions.title = "Mi locacion";
      this.marker = new google.maps.Marker(this.makerOptions);
      console.log(this.makerOptions);

    }, 2000);
  }
}
