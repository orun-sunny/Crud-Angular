import { CommonModule } from "@angular/common";
import { afterNextRender, Component, inject, Injector, signal } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductModel } from "../../Model/product";
import { Product } from "../../Services/product";

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: "app-item-master",
  styleUrl: "./item-master.css",
  templateUrl: "./item-master.html",
})
export class ItemMaster {
  showAddProductModal = false;
  productForm: FormGroup = new FormGroup({});
  productList = signal<ProductModel[]>([]);
  loadError = signal("");
  productService = inject(Product);
  private injector = inject(Injector);

  constructor(private fb: FormBuilder) {
    this.setFormState();
    afterNextRender(() => this.getAllProducts(), { injector: this.injector });
  }

  openAddProductModal(): void {
    this.showAddProductModal = true;
  }

  closeAddProductModal(): void {
    this.setFormState
    this.showAddProductModal = false;
    this.productForm.reset({
      productName: "",
      price: "",
      description: "",
      rating: "",
      status: "active",
    });
  }
  isEditMode = false;

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
        this.loadError.set("Could not save product. Check the API and the browser console.");
      },
    });
  }

  getAllProducts(): void {
    this.loadError.set("");
    this.productService.getAllProducts().subscribe({
      next: (response: ProductModel[]) => {
        this.productList.set(Array.isArray(response) ? response : []);
      },
      error: (error) => {
        console.error("Error fetching products:", error);
        const status = error?.status ? ` (${error.status})` : "";
        this.loadError.set(`Could not load products from http://localhost:5115/api/Products${status}`);
      },
    });
  }

  isActive(item: ProductModel): boolean {
    return item.status === true || item.status === "active";
  }

  openAddProductModa(): void {
  this.isEditMode = false;

  this.productForm.reset({
    id: 0,
    productName: "",
    price: "",
    description: "",
    rating: "",
    status: "active",
  });

  this.showAddProductModal = true;
}

  editProduct(productId: any): void {
    const productToEdit = this.productList().find((product) => product.id === productId);
    if (productToEdit) {
      this.productForm.setValue({
        id: productToEdit.id,
        productName: productToEdit.productName,
        price: String(productToEdit.price),
        description: productToEdit.description,
        rating: String(productToEdit.rating),
        status: productToEdit.status === true || productToEdit.status === "active" ? "active" : "inactive",
      });
      this.showAddProductModal = true;
    } else {
      console.error(`Product with ID ${productId} not found.`);
      this.loadError.set(`Product with ID ${productId} not found.`);
    }
  }


  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        alert("Product deleted successfully.");
        this.getAllProducts();
      },
      error: (error) => {
        console.error("Error deleting product:", error);
        this.loadError.set("Could not delete product. Check the API and the browser console.");
      }
    });
  }
}
