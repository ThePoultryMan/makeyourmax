export type Preferences = {
  showMaxOnPrPage: boolean,
  defaultBarbellWeight: BarbellWeight;
  weightUnits: WeightUnit;
  theme: Theme;
};
export type Theme = "MyProd";
export type BarbellWeight = 45 | 35 | 25 | 15 | 20 | 15;
export type WeightUnit = "Pounds" | "Kilograms";

export type Scores = {
  movements: Record<string, Movement>;
  scores: Record<string, ScoreData>;
};
export type Movement = {
  name: string,
  scoreType: ScoreType,
}
export type ScoreData = {
  highest?: AbstractScore,
  scores: AbstractScore[],
}
export interface AbstractScore {
  type: ScoreType,
};
export interface WeightScore extends AbstractScore {
  weight: number,
  reps: number,
  sets?: number,
}
export type ScoreType = "Weight";

export type Score = WeightScore;
