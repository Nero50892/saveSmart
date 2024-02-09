import { CommonModule } from '@angular/common';
import { Component, Signal, ViewEncapsulation, effect, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ProductOverviewHeaderComponent } from "../../ui/product-overview-header/product-overview-header.component";
import { CurrencyFormatPipe } from "../../utils/pipes/currency-format.pipe";
import { ProductOverviewFacadeService } from '../../data-access/facades/product-overview-facade.service';
import { Product } from '../../utils/interfaces/product.interface';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
  imports: [FormsModule, ReactiveFormsModule, DataViewModule, DropdownModule, CommonModule, ButtonModule, DialogModule, InputTextareaModule, ProductOverviewHeaderComponent, TableModule, CurrencyFormatPipe],
  encapsulation: ViewEncapsulation.None
})
export class ProductOverviewComponent {
  private productOverviewFacade: ProductOverviewFacadeService = inject(ProductOverviewFacadeService);
  allProductsBySmartphones: Signal<Product[]> = this.productOverviewFacade.allProductsBySmartphones;

  sortOrder: Signal<number> = this.productOverviewFacade.sortOrder;
  sortField: Signal<string> = this.productOverviewFacade.sortField;

  productList: string = "";
  smartPhone: string = "";

  mappedProductList: Product[] = [];

  constructor() {
    effect(() => {
      this.mappedProductList = this.allProductsBySmartphones();
    })
  }

  clearDataView() {
    this.productOverviewFacade.clearDataView();
  }

  loadProducts(products: any) {
    let productList: Product[] = [];
    this.smartPhone = products.query;
    for (let index = 0; index < products.relatedProducts.length; index++) {
      const element = products.relatedProducts[index];
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
    this.productOverviewFacade.changeProductListManually(productList);
  }

  calculateMaxCosts(onetime: string, monthly: string): string {
    let max: number = parseInt(monthly) * 24 + parseInt(onetime);
    return max.toString();
  }

  getProvider(value: string): string {
    switch (value) {
      case "tarife_o2":
        return "Telefonica"
        break;
      case "tarife_vodafone":
        return "Vodafone"
        break;
      case "tarife_telekom":
        return "Telekom"
        break;
      case "tarife_otelo":
        return "Otelo"
        break;
      case "tarife_congstar":
        return "Congstar"
        break;

      default:
        return value
        break;
    }
  }

}
