/**
 * Interface representing a team.
 * 
 * @interface ITeam
 */
export interface ITeam {
    // The name of the team.
    name: string;
    // The three-letter acronym (TLA) for the team.
    tla: string;
    // The short name of the team.
    shortName: string;
    // The URL or path to the team's crest image.
    crest: string;
    // The URL to the team's official website.
    website: string;
    // The year the team was founded.
    founded: number;
    // The official colors of the team.
    clubColors: string;
  }