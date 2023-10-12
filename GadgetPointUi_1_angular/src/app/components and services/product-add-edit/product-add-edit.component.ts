import { Component,Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from 'src/app/shared/messages.service';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent  implements OnInit{
  proForm: FormGroup;

  // category: string[] = [
  //   'Matric',
  //   'Diploma',
  //   'Intermediate',
  //   'Graduate',
  //   'Post Graduate',
  // ];
  // subCategory: string[] = [
  //   'Matric',
  //   'Diploma',
  //   'Intermediate',
  //   'Graduate',
  //   'Post Graduate',
  // ];

  constructor(
    private _fb: FormBuilder,
    private _proService: ProductService,
    private _dialogRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _messageService: MessagesService
  ) {
    this.proForm = this._fb.group({
      productName: '',
      description: '',
      price: '',
      productImage: '',
      category: '',
      subCategory: '',
      brand: '',
    });
  }

  ngOnInit(): void {
    this.proForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.proForm.valid) {
      if (this.data) {
        this._proService
          .updateProduct(this.data.id, this.proForm.value)
          .subscribe({
            next: (val: any) => {
              this._messageService.openSnackBar('Product detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._proService.addProduct(this.proForm.value).subscribe({
          next: (val: any) => {
            this._messageService.openSnackBar('Product added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
