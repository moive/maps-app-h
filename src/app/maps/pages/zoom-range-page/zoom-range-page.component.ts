import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.scss'],
})
export class ZoomRangePageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  zoom: number = 10;
  map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'The element HTML is not found';
    this.map = new Map({
      container: this.divMap?.nativeElement, //'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
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
