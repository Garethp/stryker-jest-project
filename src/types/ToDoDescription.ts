export enum DescriptionType {
  FULL = "FULL",
  SHORT = "SHORT",
}

export type FullDescription = {
  type: DescriptionType.FULL;
  name: string;
  summary: string;
  description: string;
};

export type ShortDescription = {
  type: DescriptionType.SHORT;
  description: string;
};

export type ToDoDescription = FullDescription | ShortDescription;
