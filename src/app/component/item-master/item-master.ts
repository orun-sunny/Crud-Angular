import { Component, ViewChild } from "@angular/core";

@Component({
  imports: [],
  selector: "app-item-master",
  styleUrl: "./item-master.css",
  templateUrl: "./item-master.html",
})
export class ItemMaster {

  @ViewChild("addProductModal") addProductModal: any;
  showAddProductModal: boolean = false;

  openAddProductModal(): void {
    this.showAddProductModal = true;
  }

  closeAddProductModal(): void {
    this.showAddProductModal = false;
  }
}
