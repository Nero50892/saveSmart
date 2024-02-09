import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { MobilezoneMiddlewareApiService } from '../infrastructure/mobilezone-middleware-api.service';
import { SelectItem } from 'primeng/api';
import { AllProductsBySmartphoneFilter } from 'src/app/utils/interfaces/all-products-by-smartphone-filter.interface';
import { AllSmartphoneByManufacturerFilter } from 'src/app/utils/interfaces/all-smartphones-by-manufacturer-filter.interface';
import { ManufacturerFilter } from 'src/app/utils/interfaces/manufacturer-filter.interface';
import { Product } from 'src/app/utils/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductOverviewFacadeService {
  private mobileApi = inject(MobilezoneMiddlewareApiService);
  readonly categoryFilter: ManufacturerFilter = {
    "name": "CategoryPath",
    "values": [
      {
        "value": [
          "smartphones"
        ],
        "type": "or",
        "exclude": false
      }
    ],
    "substring": true
  }

  manufacturerFilter: ManufacturerFilter = {
    "name": "Manufacturer",
    "values": [
      {
        "value": "",
        "type": "or",
        "exclude": false
      }
    ],
    "substring": true
  }

  readonly getAllSmartphoneByManufacturerFilter: AllSmartphoneByManufacturerFilter = {
    "query": "*||campaign-smartphones-samsung",
    "filters": [
      this.categoryFilter,
      this.manufacturerFilter,
    ],
    "page": 1,
    "hitsPerPage": 99
  }

  getAllProductsBySmartphoneFilter: AllProductsBySmartphoneFilter = {
    "sku": "",
    productType: "device",
    searchInformation: {
      page: 1,
      hitsPerPage: 99,
      filter: []
    },
    parentSku: ""
  }

  private sortOrderSignal: WritableSignal<number> = signal<number>(0);
  readonly sortOrder: Signal<number> = this.sortOrderSignal.asReadonly();

  private sortFieldSignal: WritableSignal<string> = signal<string>("");
  readonly sortField: Signal<string> = this.sortFieldSignal.asReadonly();

  private filteredManufacturerSignal: WritableSignal<string> = signal<string>("");
  readonly filteredManufacturer: Signal<string> = this.filteredManufacturerSignal.asReadonly();

  private allSmartphonesByManufacturerSignal: WritableSignal<SelectItem[]> = signal<SelectItem[]>([]);
  readonly allSmartphonesByManufacturer: Signal<SelectItem[]> = this.allSmartphonesByManufacturerSignal.asReadonly();

  private allProductsBySmartphonesSignal: WritableSignal<Product[]> = signal<Product[]>([]);
  readonly allProductsBySmartphones: Signal<Product[]> = this.allProductsBySmartphonesSignal.asReadonly();


  constructor() { }

  clearDataView() {
    this.allProductsBySmartphonesSignal.set([]);
  }

  changeProductListManually(list: Product[]) {
    this.allProductsBySmartphonesSignal.set(list);
  }

  sortingChanged(value: string) {
    if (value.indexOf('!') === 0) {
      this.sortOrderSignal.set(-1);
      this.sortFieldSignal.set(value.substring(1, value.length));
    } else {
      this.sortOrderSignal.set(1);
      this.sortFieldSignal.set(value);
    }
  }

  filterChanged(manufacturerFilterValue: string): void {
    this.filteredManufacturerSignal.set(manufacturerFilterValue);
    this.manufacturerFilter.values[0].value = manufacturerFilterValue;
    this.mobileApi.getAllSmartphones(this.getAllSmartphoneByManufacturerFilter).subscribe(
      {
        next: (response) => {
          this.allSmartphonesByManufacturerSignal.set(this.parseResponseForAllSmartphones(response.relatedProducts))
        },
        complete: () => { },
        error: () => { },
      }
    )
  }

  resetAllSmartphones() {
    this.allSmartphonesByManufacturerSignal.set([]);
  }

  smartphoneSelectionChanged(selectedSmartphone: string): void {
    this.getAllProductsBySmartphoneFilter.parentSku = selectedSmartphone;
    this.getAllProductsBySmartphoneFilter.sku = selectedSmartphone;
    this.mobileApi.getAllSmartphoneProducts(this.getAllProductsBySmartphoneFilter).subscribe(
      {
        next: (response) => {
          this.allProductsBySmartphonesSignal.set(this.parseResponseForAllProducts(response));

        },
        complete: () => { },
        error: () => { },
      }
    )
  }

  private parseResponseForAllProducts(response: any): Product[] {
    let productList: Product[] = [];
    // this.smartPhone = products.query;
    for (let index = 0; index < response.relatedProducts.length; index++) {
      const element = response.relatedProducts[index];
      for (let index = 0; index < element.variants.length; index++) {
        const variant = element.variants[index];
        let product: Product = {
          id: element.defaultVariant,
          category: element.category,
          name: element.name,
          description: variant.description,
          oneTimeCost: variant.price.onetime.total,
          monthlyCost: variant.price.monthly.total,
          monthlyCostsNumber: variant.price.monthly.total,
          maxCosts: this.calculateMaxCosts(variant.price.onetime.total, variant.price.monthly.total),
          maxCostsNumber: parseInt(variant.price.monthly.total) * 24 + parseInt(variant.price.onetime.total),
          highlights: element.highlights[0]
        };
        productList.push(product);
      }
    }
    return productList;
  }

  private calculateMaxCosts(onetime: string, monthly: string): string {
    let max: number = parseInt(monthly) * 24 + parseInt(onetime);
    return max.toString();
  }

  private parseResponseForAllSmartphones(apiResponse: any[]): SelectItem[] {
    let allSmartPhones: SelectItem[] = [];
    for (let index = 0; index < apiResponse.length; index++) {
      const element = apiResponse[index];
      for (let index = 0; index < element.variants.length; index++) {
        const variant = element.variants[index];
        let smartPhone: SelectItem = {
          label: variant.description,
          value: variant.sku
        }
        allSmartPhones.push(smartPhone);
      }
    }
    return allSmartPhones;
  }
}
