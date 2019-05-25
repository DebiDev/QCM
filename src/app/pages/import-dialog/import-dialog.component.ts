import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatRadioButton } from "@angular/material";

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent implements OnInit {

  @ViewChild("importWithTheme") radioGroup: MatRadioButton
  themesArray = [];

  nbQuestions;

  communTheme = "";

  constructor(private dialogRef: MatDialogRef<ImportDialogComponent>,
     @Inject(MAT_DIALOG_DATA) data) {
  		this.themesArray = data.themesArray;
  		this.nbQuestions = data.nbQuestions;

     }

  ngOnInit() {
  	//console.log(this.radioGroup);
  }

  cancel() {
  	this.dialogRef.close();
  }

  confirm() {
  	if(!this.themesArray.includes(this.communTheme)) {
      this.themesArray.push(this.communTheme);
      this.themesArray.sort();
    }

    let outputData = {
      communTheme: this.communTheme,
      themesArray: this.themesArray
    }
  	this.dialogRef.close(outputData);
  }

}
