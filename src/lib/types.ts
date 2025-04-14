export type Preferences = {
  defaultBarbellWeight: BarbellWeight;
  theme: Theme;
};
export type Theme = "MyProd";
export type BarbellWeight = 45 | 35 | 25 | 15;

export type Scores = {
  movements: string[];
  scores: Record<string, Score | undefined>;
};
export type Score = {
  score: number;
  scoreType: ScoreType;
};
export type ScoreType = "Weight";
