import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  hasPermission = false;

  async requestPermissions() {
    try {
      if (Capacitor.getPlatform() === 'web') {
        await Geolocation.getCurrentPosition();
      } else {
        await Geolocation.requestPermissions();
      }
      return this.hasPermissions();
    } catch (e) {
      return false;
    }
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    return { coordinates: [coordinates.coords.latitude, coordinates.coords.longitude] };
  }

  public async hasPermissions() {
    if (this.hasPermission) {
      return true;
    }

    const permission = await Geolocation.checkPermissions();

    if (permission.coarseLocation === 'granted') {
      this.hasPermission = true;
      return true;
    }

    if (permission.coarseLocation === 'denied') {
      return false;
    }

    if (permission.coarseLocation === 'prompt') {
      return false;
    }

    return false;
  }
}
