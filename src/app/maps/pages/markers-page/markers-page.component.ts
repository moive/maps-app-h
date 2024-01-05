import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.scss'],
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  zoom: number = 10;
  map?: Map;
  currentLngLat: LngLat = new LngLat(-77.137, -11.8276);
  lng: number = this.currentLngLat.lng;
  lat: number = this.currentLngLat.lat;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'The element HTML is not found';
    this.map = new Map({
      container: this.divMap?.nativeElement, //'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    const markerHtml = document.createElement('div');
    markerHtml.innerHTML = '😀';

    const marker = new Marker({
      color: 'tomato',
      // element: markerHtml,
    })
      .setLngLat(this.currentLngLat)
      .addTo(this.map);
  }
}
