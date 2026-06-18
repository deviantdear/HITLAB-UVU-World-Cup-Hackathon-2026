import raw from "@/data/scaleGrid.json";
import type { GovernmentUnit } from "@/lib/governanceModel";

export type CellState = "published" | "generating" | "ready";

export interface ScaleEntity {
  name: string;
  governmentUnit: GovernmentUnit;
}
export interface ScaleFunction {
  id: string;
  title: string;
}
export interface ScaleCell {
  entity: string;
  functionId: string;
  state: CellState;
  version?: number;
}
export interface ScaleGridData {
  totalEstimate: number;
  entities: ScaleEntity[];
  functions: ScaleFunction[];
  cells: ScaleCell[];
}

export const scaleGrid = raw as unknown as ScaleGridData;
