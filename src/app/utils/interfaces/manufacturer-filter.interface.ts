export interface ManufacturerFilter {
    name: string;
    values: {
      value: string[] | string;
      type: string;
      exclude: boolean
    }[];
    substring: boolean
  }