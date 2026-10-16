import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductModel } from "../../Model/product";
import { Product } from "../../Services/product";

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: "app-item-master",
  styleUrl: "./item-master.css",
  templateUrl: "./item-master.html",
})
export class ItemMaster implements OnInit {
  showAddProductModal = false;
  productForm: FormGroup = new FormGroup({});
  productList: ProductModel[] = [];
  productService = inject(Product);
  private platformId = inject(PLATFORM_ID);

  constructor(private fb: FormBuilder) {
    this.setFormState();
  }

  ngOnInit(): void {
    this.setFormState();
    if (isPlatformBrowser(this.platformId)) {
      this.getAllProducts();
    }
  }

  openAddProductModal(): void {
    this.showAddProductModal = true;
  }

  closeAddProductModal(): void {
    this.showAddProductModal = false;
    this.productForm.reset({
      productName: "",
      price: "",
      description: "",
      rating: "",
      status: "active",
    });
  }

  setFormState() {
    this.productForm = this.fb.group({
      id: [0],
      productName: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required]],
      rating: ["", [Validators.required]],
      status: ["active", [Validators.required]],
    });
  }

  getFormValue(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;
    const payload: ProductModel = {
      id: 0,
      productName: formValue.productName,
      price: String(formValue.price),
      description: formValue.description,
      rating: Number(formValue.rating),
      status: formValue.status === "active" || formValue.status === true,
    };

    this.productService.addProduct(payload).subscribe({
      next: () => {
        this.closeAddProductModal();
        this.getAllProducts();
      },
      error: (error) => {
        console.error("Error adding product:", error);
      },
    });
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: ProductModel[]) => {
        this.productList = response ?? [];
      },
      error: (error) => {
        console.error("Error fetching products:", error);
      },
    });
  }

  isActive(item: ProductModel): boolean {
    return item.status === true || item.status === "active";
  }
}
