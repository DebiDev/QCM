import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatRadioButton, MatCheckbox } from "@angular/material";

@Component({
  selector: 'app-export-tag-dialog',
  templateUrl: './export-tag-dialog.component.html',
  styleUrls: ['./export-tag-dialog.component.scss']
})
export class ExportTagDialogComponent implements OnInit {

  @ViewChild("offsetRadio") offsetRadio: MatRadioButton;

  tagName = "";

  offset = 0;
  constructor(private dialogRef: MatDialogRef<ExportTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 

  }

  ngOnInit() {
  }

  cancel() {
  	this.dialogRef.close();
  }

  confirm() {
  	if(this.tagName) {
  		let outputData = {
  			tagName: this.tagName,
  			offset: this.offset
  		}
      	this.dialogRef.close(outputData);
  	} else {
  		this.dialogRef.close();
  	}
  }

}
