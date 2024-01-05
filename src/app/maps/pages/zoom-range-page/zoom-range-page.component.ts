import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.scss'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  zoom: number = 10;
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

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener() {
    if (!this.map) throw 'The map is not initialized';
    this.map.on('zoom', ev => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', ev => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat } = this.currentLngLat;
      this.lng = lng;
      this.lat = lat;
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
