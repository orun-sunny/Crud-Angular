import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: "app-item-master",
  styleUrl: "./item-master.css",
  templateUrl: "./item-master.html",
})
export class ItemMaster implements OnInit {

  @ViewChild("addProductModal") addProductModal: any;
  showAddProductModal: boolean = false;

  productForm : FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.setFormState();
  }

  ngOnInit(): void {
    this.setFormState();
  }

  openAddProductModal(): void {
    this.showAddProductModal = true;
  }

  closeAddProductModal(): void {
    this.showAddProductModal = false;
  }

  setFormState() {
    this.productForm = this.fb.group({
      id: [''],
      ProductName: ['', [Validators.required]],
      Price: ['',[Validators.required]],
      Description: ['', [Validators.required]],
     
      Rating: ['', [Validators.required]],
      Status: ['', [Validators.required]],  
    });
  }
getFormValue(): void {
  console.log("Form submitted!");

  console.log("Form valid:", this.productForm.valid);
  console.log("Form values:", this.productForm.value);

  if (this.productForm.invalid) {
    console.log("Form is invalid");
    this.productForm.markAllAsTouched();
    return;
  }

  console.log("Submitted product:", this.productForm.value);
}
}
