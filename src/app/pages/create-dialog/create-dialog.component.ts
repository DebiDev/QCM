import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  themesArray = [];

	q = {
      "id": "",
      "isMultiple": false,
      "answers": [
        {
          "answer": "",
          "correct": false
        }
      ],
      "question": "",
      "theme": ""
    }
  constructor(private dialogRef: MatDialogRef<CreateDialogComponent>,
     @Inject(MAT_DIALOG_DATA) data) {
      this.themesArray = data.themesArray;
     }

  ngOnInit() {
  }

  addQuestion() {
  	this.q.answers.push({"answer": "", "correct": false});
  }

  deleteQuestion(index) {
  	this.q.answers.splice(index, 1);
  }

  cancel() {
  	this.dialogRef.close();
  }

  add() {
    //we are checking if the question has multiple answer and set the value of isMultiple in function
    let nbCorrect = 0;
    for(let answer of this.q.answers) {
      if(answer.correct) {
        nbCorrect++;
      }
    }
    if(nbCorrect > 1) {
      this.q.isMultiple = true;
    }

    if(!this.themesArray.includes(this.q.theme)) {
      this.themesArray.push(this.q.theme);
      this.themesArray.sort();
    }

    let outputData = {
      question: this.q,
      themesArray: this.themesArray
    }
  	this.dialogRef.close(outputData);
  }

}
