import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITeam } from 'src/app/interfaces/ITeam';
import { IPlayer } from 'src/app/interfaces/IPlayer';

/**
 * Service for fetching team data.
 * 
 * @class TeamsService
 */
@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  //The base URL for the Teams API.
  private apiUrl = `${environment.apiUrl}teams`;

  /**
   * Constructs the TeamsService with the necessary dependencies.
   * 
   * @param {HttpClient} http The HTTP client service for making API requests.
   */
  constructor(private http: HttpClient) { }


  /**
   * Retrieves teams data for a specific competition, optionally filtered and paginated.
   * 
   * @param {string} competition The code of the competition to fetch teams for.
   * @param {number} page Optional. The page number for pagination.
   * @param {any} filters Optional. Filters to apply to the request.
   * @returns An Observable array of team data.
   */
  getTeams(competition: string, page?:number, filters?:any): Observable<ITeam[]> {
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

    return this.http.get<ITeam[]>(url,{params});
  }

  /**
   * Retrieves players data for a specific team.
   * 
   * @param {string} team The ID or name of the team to fetch players for.
   * @returns An Observable array of player data.
   */
  getPlayers(team: string): Observable<IPlayer[]> {
    let params = new HttpParams();
    const url = `${this.apiUrl}/${team}/players`;

    return this.http.get<IPlayer[]>(url,{params});
  }

}
