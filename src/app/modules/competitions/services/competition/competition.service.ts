import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

  
@Injectable({
  providedIn: 'root'
})
/**
 * Service for competitions.
 * 
 * @class CompetitionService
 */
export class CompetitionService {
  // Base API URL for competitions endpoint.
  private apiUrl = `${environment.apiUrl}competitions`;
  // Base API URL for competition import endpoint.
  private apiUrlImport = `${environment.apiUrl}competitionImport`;

  /**
   * Constructor to initialize dependencies.
   * 
   * @param http HttpClient service for creating http requests.
   */
  constructor(private http: HttpClient) { }


  /**
   * Import a competition with the specified competition code.
   * 
   * @param competitionCode The code of the competition to import.
   * @returns An observable of the import operation.
   */
  importCompetition(competitionCode: string): Observable<any> {

    const url = `${this.apiUrlImport}/${competitionCode}`;
    return this.http.post<any>(url,{});
  }

  /**
   * Get competitions with optional filters.
   * 
   * @param filters Optional filters for the competitions.
   * @returns An observable of competitions data.
   */
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
