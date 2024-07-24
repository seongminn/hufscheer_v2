export const stateMap = {
  playing: '진행 중',
  scheduled: '시작 전',
  finished: '종료',
} as const;

export type StateType = keyof typeof stateMap;

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
};

export type GameType = {
  id: number;
  startTime: Date;
  gameQuarter: string;
  gameName: string;
  round: number;
  videoId?: string;
  gameTeams: GameTeamType[];
  sportsName: string;
};
