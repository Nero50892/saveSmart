import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOverviewHeaderComponent } from './product-overview-header.component';

describe('ProductOverviewHeaderComponent', () => {
  let component: ProductOverviewHeaderComponent;
  let fixture: ComponentFixture<ProductOverviewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductOverviewHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductOverviewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
