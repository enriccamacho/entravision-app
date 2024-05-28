/**
 * Interface representing a player.
 * 
 * @interface IPlayer
 */
export interface IPlayer {
    // The name of the player.
    name: string;
    // The identifier for the player.
    playerId: string;
    // The position the player plays in.
    position: string;
    // The player's date of birth.
    dateOfBirth: string;
    // The nationality of the player.
    nationality: string;
    // The shirt number assigned to the player.
    shirtNumber: number;
    // The section the player belongs to (e.g., Goalkeeper, Defence, Midfield, Offence).
    section: string;
  }
  