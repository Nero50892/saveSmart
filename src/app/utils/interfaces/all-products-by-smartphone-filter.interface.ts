export interface AllProductsBySmartphoneFilter {
    sku: string;
    productType: "device";
    searchInformation: {
      page: number;
      hitsPerPage: number;
      filter: string[]
    };
    parentSku: string
  }