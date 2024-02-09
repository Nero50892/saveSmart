import { Highlight } from './highlight.interface';

export interface Product {
  id: string,
  category: "tarife_o2" | "tarife_vodafone",
  name: string,
  description: string,
  oneTimeCost: string,
  monthlyCost: string,
  monthlyCostsNumber: number,
  maxCosts: string,
  maxCostsNumber: number,
  highlights: Highlight
}