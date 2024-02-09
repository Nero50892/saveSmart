import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Signal, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProductOverviewFacadeService } from '../../data-access/facades/product-overview-facade.service';

@Component({
  selector: 'app-product-overview-header',
  standalone: true,
  imports: [FormsModule, DropdownModule, CommonModule, ButtonModule, DialogModule, InputTextareaModule],
  templateUrl: './product-overview-header.component.html',
  styleUrl: './product-overview-header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductOverviewHeaderComponent {
  private productOverviewFacade: ProductOverviewFacadeService = inject(ProductOverviewFacadeService);
  allSmartphonesByFilteredManufacturer: Signal<SelectItem[]> = this.productOverviewFacade.allSmartphonesByManufacturer;
  filteredManufacturer: Signal<string> = this.productOverviewFacade.filteredManufacturer;

  productList: string = "";
  selectedSmartphone: string = "";

  sortOptionsMax!: SelectItem[];
  sortOptionsMonth!: SelectItem[];
  filterManufacturer!: SelectItem[];

  visible: boolean = false;
  clearDataViewDisabled: boolean = true;
  sendRequestDisabled: boolean = true;

  //TODO: weitere input parameter hinzufügen damit diese component dumb-component sein kann, facade rauslöschen

  @Output() manualJsonChangedEvent: EventEmitter<string> = new EventEmitter();
  @Output() resetDataViewEvent: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    this.filterManufacturer = [
      { label: 'Samsung', value: 'samsung' },
      { label: 'Apple', value: 'apple' },
      { label: 'Google', value: 'google' },
      { label: 'Xiaomi', value: 'xiaomi' }
    ]
    this.sortOptionsMax = [
      { label: 'Max Price High to Low', value: '!maxCostsNumber' },
      { label: 'Max Price Low to High', value: 'maxCostsNumber' }
    ];
    this.sortOptionsMonth = [
      { label: 'Monthly Price High to Low', value: '!monthlyCostsNumber' },
      { label: 'Monthly Price Low to High', value: 'monthlyCostsNumber' }
    ];
  }

  onSortChange(event: any) {
    this.productOverviewFacade.sortingChanged(event.value);
  }

  onManufacturerFilterChange(event: any) {
    this.productOverviewFacade.filterChanged(event.value);
    this.productOverviewFacade.resetAllSmartphones();
  }

  onSmartphoneSelectedChange(event: any) {
    this.selectedSmartphone = event.value;
    this.sendRequestDisabled = false;
  }


  updateJSON() {
    this.manualJsonChangedEvent.emit(JSON.parse(this.productList))
    this.visible = false;
    this.clearDataViewDisabled = false;
  }

  clearDataView() {
    this.productList = "";
    this.resetDataViewEvent.emit();
    this.clearDataViewDisabled = true;
  }

  showDialog() {
    this.visible = true;
  }

  sendRequest() {
    this.productOverviewFacade.smartphoneSelectionChanged(this.selectedSmartphone);
    this.clearDataViewDisabled = false;
  }
}
