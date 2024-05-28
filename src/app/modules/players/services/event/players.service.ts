import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

  
@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private apiUrl = `${environment.apiUrl}players`;

  constructor(private http: HttpClient) { }


  getPlayers(competition: string, team?: string, page?:number): Observable<any[]> {
    let params = new HttpParams();
    if(page){
      params = params.append('page', page)
    }

    const url = team ?`${this.apiUrl}/${competition}/${team}` : `${this.apiUrl}/${competition}`;

    return this.http.get<any[]>(url,{params});
  }

}
