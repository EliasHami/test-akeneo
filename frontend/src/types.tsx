export type Participant = {
  id: number;
  name: string;
  blacklist: string[];
};

export type Draw = {
  id: number;
  date: string;
  participants: string[];
  draws: [string, string][];
};
