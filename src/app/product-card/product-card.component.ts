import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../product-overview/product-overview.component';
import { CurrencyFormatPipe } from "../currency-format.pipe";

@Component({
    selector: 'app-product-card',
    standalone: true,
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss',
    imports: [CommonModule, CurrencyFormatPipe]
})
export class ProductCardComponent {
  @Input() item: Product = {
    id: "",
    category: "tarife_o2",
    name: "",
    description: "",
    oneTimeCost: "",
    monthlyCost: "",
    monthlyCostsNumber: 0,
    maxCosts: "",
    maxCostsNumber: 0,
    highlights: {
      "icon": "",
      "headline": "",
      "subline": ""
    }
  };

  @Input() first: boolean = false;
}
