export type locomotion = "driving-car" | "foot-walking" | "cycling-regular";

export interface Destiny {
  id: number;
  coords: number[];
  value: string;
}

export interface Step {
  distance: number;
  duration: number;
  name: string;
  instruction: string;
  type: number;
  way_points: any[];
}

export interface Segment {
  distance: number;
  duration: number;
  steps: Step[];
  show?: boolean;
}

export interface Summary {
  distance: number;
  duration: number;
}

export interface Properties {
  summary: Summary;
  segments: Segment[];
}

export interface Option<T> {
  text: string;
  click: (item: T) => void;
  icon?: string;
  class?: string;
}

export interface Route {
  id?: number;
  name: string;
  destinies: Destiny[];
  locomotion: locomotion;
}
