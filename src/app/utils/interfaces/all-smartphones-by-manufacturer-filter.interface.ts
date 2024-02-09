import { ManufacturerFilter } from "./manufacturer-filter.interface";

export interface AllSmartphoneByManufacturerFilter {
    query: string;
    filters: ManufacturerFilter[];
    page: number;
    hitsPerPage: number;
  }