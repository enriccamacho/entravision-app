import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlayer } from 'src/app/interfaces/IPlayer';

/**
 * Service for fetching player data.
 * 
 * @class PlayersService
 */
@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  // API URL for player data.
  private apiUrl = `${environment.apiUrl}players`;

    /**
   * Constructor for PlayersService.
   * 
   * @constructor
   * @param {HttpClient} http HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves players data.
   * 
   * @param {string} competition Competition code.
   * @param {string} team (Optional) Team code.
   * @param {number} page (Optional) Page number.
   * @returns {Observable<IPlayer[]>} An Observable of players data.
   */
  getPlayers(competition: string, team?: string, page?:number): Observable<IPlayer[]> {
    let params = new HttpParams();
    if(page){
      params = params.append('page', page)
    }

    const url = team ?`${this.apiUrl}/${competition}/${team}` : `${this.apiUrl}/${competition}`;

    return this.http.get<IPlayer[]>(url,{params});
  }

}
