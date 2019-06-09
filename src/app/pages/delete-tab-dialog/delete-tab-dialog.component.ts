import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-delete-tab-dialog',
  templateUrl: './delete-tab-dialog.component.html',
  styleUrls: ['./delete-tab-dialog.component.scss']
})
export class DeleteTabDialogComponent implements OnInit {

  theme = "";
  nbQuestions = 0;

  constructor(private dialogRef: MatDialogRef<DeleteTabDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) data) {

  	this.theme = data.theme;
  	this.nbQuestions = data.nbQuestions;
  }

  ngOnInit() {
  }

  cancel() {
  	this.dialogRef.close();
  }

  delete() {
  	this.dialogRef.close("delete");
  }

}
