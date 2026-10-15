import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ItemMaster } from "./item-master";

describe("ItemMaster", () => {
  let component: ItemMaster;
  let fixture: ComponentFixture<ItemMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMaster],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open the add product modal", () => {
    component.openAddProductModal();
    expect(component.showAddProductModal).toBe(true);
  });

  it("should close the add product modal", () => {
    component.openAddProductModal();
    component.closeAddProductModal();
    expect(component.showAddProductModal).toBe(false);
  });
});
