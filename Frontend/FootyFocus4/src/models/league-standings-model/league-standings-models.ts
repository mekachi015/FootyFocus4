export interface LeagueStandings {
  id: number;
  competitionName: string;
  competitionEmblem: string;
  seasonStartDate: string;
  seasonEndDate: string;
  currentMatchDay: number;
  position: number;
  teamName: string;
  teamCrest: string;
  teamShortName: string;
  matchesPlayed: number;
  teamForm: string;
  gamesWon: number;
  gamesLost: number;
  gamesDrew: number;
  noOfPoints: number;
  goalDifference: number;
}