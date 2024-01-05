import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}
@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.scss'],
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;
  markers: MarkerAndColor[] = [];

  zoom: number = 13;
  map?: Map;
  currentLngLat: LngLat = new LngLat(-77.125, -11.8294);
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

    this.readFromLocalStorage();

    /* const markerHtml = document.createElement('div');
    markerHtml.innerHTML = '😀';

    const marker = new Marker({
      color: 'tomato',
      // element: markerHtml,
    })
      .setLngLat(this.currentLngLat)
      .addTo(this.map); */
  }

  createMarker(): void {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(
      ({ color, marker }) => ({
        color,
        lngLat: marker.getLngLat().toArray(),
      })
    );

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }
}
