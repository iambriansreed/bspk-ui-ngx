import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IconRegistry {
  private icons = new Map<string, Promise<string>>();
  private readonly http = inject(HttpClient, { optional: true });

  constructor() {
    if (!this.http) {
      console.warn('No HttpClient is provided. Icons will not be rendered.');
    }
  }

  private cacheIcon(name: string): void {
    if (!this.http) {
      return;
    }

    if (!this.icons.has(name)) {
      this.icons.set(
        name,
        firstValueFrom(this.http.get(`/icons/${name}.svg`, { responseType: 'text' }))
      );
    }
  }

  async getIcon(name: string): Promise<string> {
    this.cacheIcon(name);
    return this.icons.get(name) ?? '';
  }
}
