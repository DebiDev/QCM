import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
  	this.dialogRef.close("cancel");
  }

  delete() {
  	this.dialogRef.close("delete");
  }

}
