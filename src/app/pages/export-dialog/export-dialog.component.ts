import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatRadioButton, MatCheckbox } from "@angular/material";

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {
  
  @ViewChild("specificExport") specific: MatRadioButton;
  question; 

  allElements;

  //Use for specific exportation
  goodAnswers = [];
  /*for ion-chip*/
  goodSelected = [];
  badAnswers = [];
  badSelected = [];

  //For user interface
  nbPossibilities = 0;

  constructor(private dialogRef: MatDialogRef<ExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
  		this.question = data.question;
  		this.question["element"] = "";
  		this.allElements = data.allElements;
  		//console.log(this.question);

      for(let a of this.question.answers) {
        //console.log(a);
        if(a.correct) {
          this.goodAnswers = this.goodAnswers.concat(a);
          this.goodSelected = this.goodSelected.concat(false);
        } else {
          this.badAnswers = this.badAnswers.concat(a);
          this.badSelected = this.badSelected.concat(false);
        }
      }
      //Select all question by default
      this.goodSelected[this.goodSelected.length - 1] = true;
      this.badSelected[this.badSelected.length - 1] = true;
      //console.log(this.goodAnswers);
      //console.log(this.badAnswers);
      this.checkNbPosibilities();
  	}

  ngOnInit() {
  }

  cancel() {
  	this.dialogRef.close();
  }

  confirm() {
  	if(!this.allElements.includes(this.question.element)) {
  		this.allElements.concat(this.question.element);
  	}

  	if(this.specific.checked) {
      let goodArrayGenerated = [];
      let badArrayGenerated = [];
      let goodIndex = this.goodSelected.findIndex((element) => element == true) + 1;
      let badIndex = this.badSelected.findIndex((element) => element == true) + 1;
      this.getAllPossibleCombinations(this.goodAnswers, goodIndex, goodArrayGenerated);
      this.getAllPossibleCombinations(this.badAnswers, badIndex, badArrayGenerated);
      //console.log(goodArrayGenerated);
      //console.log(badArrayGenerated);
  		let arrayOfGeneratedQuestion = [];
      for(let ga of goodArrayGenerated) {
        for(let ba of badArrayGenerated) {
          let q = {
            element: this.question.element,
            isMultiple: goodIndex>1 ? true : false,
            question: this.question.question,
            theme: this.question.theme,
            answers: ga.concat(ba)
          }
          arrayOfGeneratedQuestion = arrayOfGeneratedQuestion.concat(q);
        }
      }
  		let outputData = {
	  		allElements: this.allElements,
	  		generatedArray: arrayOfGeneratedQuestion
	  	}
	  	this.dialogRef.close(outputData);
  	} else {
	  	let outputData = {
	  		allElements: this.allElements,
	  		generatedArray: this.question
	  	}
	  	this.dialogRef.close(outputData);
	  }
  }

  changeGoodSelected(index) {
    let indexTrue = this.goodSelected.findIndex((element) => element == true);
    this.goodSelected[indexTrue] = false;
    this.goodSelected[index] = true;
    this.checkNbPosibilities();
  }

  changeBadSelected(index) {
    let indexTrue = this.badSelected.findIndex((element) => element == true);
    this.badSelected[indexTrue] = false;
    this.badSelected[index] = true;
    this.checkNbPosibilities();
  }

  generateQuestion() {
 //  	let generatedArray = [];
 //  	let answersSelected = [];
 //  	this.checkAnswers.toArray().map( (item, index) => {
 //  		if(item.checked) {
 //  			answersSelected = answersSelected.concat(this.question.answers[index]);
 //  		}
 //  	});
 //  	let q = {
	// 	element: this.question.element,
	// 	isMultiple: this.question.isMultiple,
	// 	question: this.question.question,
	// 	theme: this.question.theme,
	// 	answers: []
	// }

 //  	for(let a of this.perm(answersSelected)) {
 //  		generatedArray = [].concat(generatedArray, {
 //  			element: this.question.element,
	// 		isMultiple: this.question.isMultiple,
	// 		question: this.question.question,
	// 		theme: this.question.theme,
	// 		answers: a  		
	// 	});
 //  	}

 //  	return generatedArray;

  	
  }

  getCombinations = function(array, size, start, initialStuff, output) {
    if (initialStuff.length >= size) {
        output.push(initialStuff);
    } else {
        var i;
		
        for (i = start; i < array.length; ++i) {	
	    this.getCombinations(array, size, i + 1, initialStuff.concat(array[i]), output);
        }
    }
  }

  getAllPossibleCombinations = function(array, size, output) {
    this.getCombinations(array, size, 0, [], output);
  }


  checkNbPosibilities() {
    let index1 = this.goodSelected.findIndex((element) => element == true) + 1;
    let index2 = this.badSelected.findIndex((element) => element == true) + 1;
    this.nbPossibilities = this.combinaison(index1, this.goodSelected.length) * this.combinaison(index2, this.badSelected.length);
  }

  combinaison(k, n) {
    return this.factorial(n)/(this.factorial(k)*this.factorial(n-k));
  }

  factorial(n){
    return (n<2) ? 1 : this.factorial(n-1)*n;
  }

}
