import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Setting {
  settingId?: number;
  name: string;
  value: number;
  effectiveDate: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = 'https://localhost:7227/api/Settings';

  constructor(private http: HttpClient) {}

  getAllSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(this.apiUrl);
  }

  getSetting(name: string, effectiveDate?: string): Observable<Setting> {
    // Include the setting name in the URL path
    let url = `${this.apiUrl}/${encodeURIComponent(name)}`;
    
    // Add effective date as a query parameter if provided
    let params = new HttpParams();
    if (effectiveDate) {
      params = params.set('effectiveDate', effectiveDate);
    }

    return this.http.get<Setting>(url, { params });
  }

  addSetting(setting: Setting): Observable<Setting> {
    return this.http.post<Setting>(this.apiUrl, setting);
  }

  updateSetting(setting: Setting): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${setting.settingId}`, setting);
  }

  deleteSetting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
