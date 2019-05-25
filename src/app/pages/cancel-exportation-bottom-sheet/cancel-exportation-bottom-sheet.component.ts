import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';


@Component({
  selector: 'app-cancel-exportation-bottom-sheet',
  templateUrl: './cancel-exportation-bottom-sheet.component.html',
  styleUrls: ['./cancel-exportation-bottom-sheet.component.scss']
})
export class CancelExportationBottomSheetComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheetRef) { }

  ngOnInit() {
  }

  sendNo() {
  	this.bottomSheet.dismiss("no");
  }

  sendYes() {
  	this.bottomSheet.dismiss("yes");
  }

}
