import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

  
  interface Team {
    name: string;
    tla: string;
    shortName: string;
    crest: string;
  }
@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private apiUrl = `${environment.apiUrl}teams`;

  constructor(private http: HttpClient) { }


  getTeams(competition: string, page?:number, filters?:any): Observable<any[]> {
    let params = new HttpParams();
    if(filters){
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
              params = params.append(key, filters[key]);
            }
          });
    }
    if(page){
      params = params.append('page', page)
    }
    const url = `${this.apiUrl}/${competition}`;

    return this.http.get<any[]>(url,{params});
  }

  getPlayers(team: string): Observable<any[]> {
    let params = new HttpParams();
    const url = `${this.apiUrl}/${team}/players`;

    return this.http.get<any[]>(url,{params});
  }

}
