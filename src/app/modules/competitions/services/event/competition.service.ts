import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

  
@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private apiUrl = `${environment.apiUrl}competitions`;
  private apiUrlImport = `${environment.apiUrl}competitionImport`;

  constructor(private http: HttpClient) { }

  importCompetition(competitionCode: string): Observable<any> {

    const url = `${this.apiUrlImport}/${competitionCode}`;
    return this.http.post<any>(url,{});
  }

  getCompetitions(filters?: any): Observable<any[]> {
    let params = new HttpParams();
    if(filters){
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
              params = params.append(key, filters[key]);
            }
          });
    }
    const url = `${this.apiUrl}`;

    return this.http.get<any[]>(url,{params});
  }

}
