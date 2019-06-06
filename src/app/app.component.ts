import { Component, ViewEncapsulation } from '@angular/core';
import { FileService } from './services/file.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from './pages/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from './pages/create-dialog/create-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { CancelExportationBottomSheetComponent } from './pages/cancel-exportation-bottom-sheet/cancel-exportation-bottom-sheet.component';
import { ImportDialogComponent } from './pages/import-dialog/import-dialog.component';
import { ExportDialogComponent } from './pages/export-dialog/export-dialog.component';
import { ExportTagDialogComponent } from './pages/export-tag-dialog/export-tag-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'QCM';

  //Array of boolean used to trigger modification mode (ngIf) for a specific question
  arrayModif = [];

  //Used to update theme at the end of the modification (Cannot make two-ways binding)
  themeInput = "";

  //Contains JSOn
  qcmContainer;

  //Array for tabs
 themesArray = [];

 //Contains all different elements for exportation
 allElements = [];

  //This array will contains questions to export
  exportQCM = [];

  exportMode = false;

  constructor(
  	private file: FileService,
  	public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet) {

  	/*Get JSON file from our service 
	* The getJSON function return a promise (asynchronous function)
	* We just need to read the returned value with a then()
  	*/
  	this.file.getJSON().then(db => {
  		this.qcmContainer = db;
  		//console.log(db);
  		//Initialisation of the modification array 
	  	for(let i in this.qcmContainer.qcm) {
	  		this.arrayModif[i] = false;
	  	}

      this.themesArray = Array.from(new Set(this.qcmContainer.qcm.map(q => q.theme))).sort();
  	});
  }

  //Display Form Dialog for new question
  newQuestion() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      themesArray: this.themesArray
    }
  	let dialogRef = this.dialog.open(CreateDialogComponent, dialogConfig);

  		//When the modal is closed
 	dialogRef.afterClosed().subscribe( action => {
 		//If it's not empty, we push it and we update the DB
 		if(action.question) {
 			this.qcmContainer.qcm.push(action.question);
 			//We update the DB with our service
  			this.file.updateJSON(this.qcmContainer).then(() => {
          //console.log("JSON updated")
        });
 		}

    if(action.themesArray) {
      this.themesArray = action.themesArray;
    }
 	});
  }

  //Starting modification of one QCM
  startModif(index) {
  	//Display concerned inputs 
  	this.arrayModif[index] = true;
    this.themeInput = this.qcmContainer.qcm[index].theme;
  }

  bindTheme(value:string) {
    //console.log(value.trim());
    this.themeInput = value.trim();
  }

  //Cancel modification
  cancelModif(index) {
    this.themeInput = "";
  	//We remove all concerned inputs 
  	this.arrayModif[index] = false;
  	//We get the last state of the DB to cancel any modification
  	this.file.getJSON().then(db => {
  		this.qcmContainer = db;
  	});
  }

  getIndexOfQuestion(question) {
    return this.qcmContainer.qcm.findIndex(q => q.id == question.id && q.question == question.question);
  }

  //Validation of the modification
  validModif(index) {
  	//We remove all concerned inputs 
  	this.arrayModif[index] = false;
    //we are checking if the question has multiple answer and set the value of isMultiple in function
    let nbCorrect = 0;
    let question  = this.qcmContainer.qcm[index];
    for(let answer of question.answers) {
      if(answer.correct) {
        nbCorrect++;
      }
    }
    if(nbCorrect > 1) {
      this.qcmContainer.qcm[index].isMultiple = true;
    }
    if(this.themeInput != question.theme) {
      question.theme = this.themeInput;
      this.themeInput = "";
    }
    if(!this.themesArray.includes(question.theme)) {
      this.themesArray.push(question.theme);
      this.themesArray.sort();
    }
  	//We update the DB with our service
  	this.file.updateJSON(this.qcmContainer).then(() => {
      //console.log("JSON updated")
    });
  }

  //Open dialog to confirm deletion of the specific QCM
  openDeleteDialog(index) {

  	//Open Dialog 
  	let dialogRef = this.dialog.open(DeleteDialogComponent);

  	//When the modal is closed
   	dialogRef.afterClosed().subscribe( action => {
   		//If deletion is confirm, we delete the QCM and we update the DB
   		if(action == "delete") {
   			this.qcmContainer.qcm.splice(index,1);
   			//We update the DB with our service
    			this.file.updateJSON(this.qcmContainer).then(() => {
            //console.log("JSON updated")
          });
   		}
   	});
  }

  //Call when an item is dropped 
  drop(event: CdkDragDrop<[]>) {
    //console.log(event.previousContainer.element.nativeElement.classList[0]);
    if (event.previousContainer.element.nativeElement.classList[0] == "scroll" && event.previousContainer != event.container) {
      if(!this.exportQCM || this.exportQCM.length == 0) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          question: event.previousContainer.data[event.previousIndex],
          allElements: this.allElements
        }
        dialogConfig.height = "80%";

        let dialogRef = this.dialog.open(ExportDialogComponent, dialogConfig);
        //Will contains the question or array of questions when the modal will close
        let generatedQuestions;
          //When the modal is closed
        dialogRef.afterClosed().subscribe(action => {
          if(action) {
            this.allElements = action.allElements;
            //Will contains the question or array of questions when the modal will close
            let generatedQuestions = action.generatedArray;
            //console.log(generatedQuestions);
           
            this.exportQCM = this.exportQCM.concat(generatedQuestions);
          }
        });
        // this.exportQCM = this.exportQCM.concat(event.previousContainer.data[event.previousIndex]);
      } else {
        for(let exportQuestion of event.container.data) {
          if(JSON.stringify(event.previousContainer.data[event.previousIndex]).toLowerCase() === JSON.stringify(exportQuestion).toLowerCase()) {
            this.snackBar.open("Cette question est déjà dans l'exportation !", "Ok !", {verticalPosition: 'top', horizontalPosition: 'center'})
            return;
          }
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          question: event.previousContainer.data[event.previousIndex],
          allElements: this.allElements
        }
        dialogConfig.height = "80%";
        let dialogRef = this.dialog.open(ExportDialogComponent, dialogConfig);
        
         //When the modal is closed
        dialogRef.afterClosed().subscribe(action => {
          if(action) {
            this.allElements = action.allElements;

            //Will contains the question or array of questions when the modal will close
            let generatedQuestions = action.generatedArray;
            //console.log(generatedQuestions);

            this.exportQCM = this.exportQCM.concat(generatedQuestions);
          }
        });
        // if(!this.exportQCM || this.exportQCM.length == 0) {
        //   this.exportQCM = this.exportQCM.concat(event.previousContainer.data[event.previousIndex]);
        // } else {
        //   transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        // }
        
      }
    } else if (event.previousContainer.element.nativeElement.classList[0] == "exportContainer" && event.previousContainer != event.container) {
      this.exportQCM.splice(event.previousIndex, 1);
    } else if(event.previousContainer != event.container) {
      copyArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
    } 
  }

  startImportation() {
    this.file.importQCM().then((doc) => {
      let questionsArray = doc.split("\\element{");
      questionsArray.splice(0, 1);
      let QCMToAdd = [];
      for(let question of questionsArray) {
        if(QCMToAdd.length == 0) {
          QCMToAdd = QCMToAdd.concat(this.handleOneQuestionOfImport(question));
        } else {
          QCMToAdd.push(this.handleOneQuestionOfImport(question));
        }
        
      }
      //console.log(QCMToAdd);
      //Remove questions with no answer
      QCMToAdd = QCMToAdd.filter(function(item) {
        if(item && item.answers && item.answers.length > 0) {
          return true;
        }
      })
      //console.log(QCMToAdd);

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        nbQuestions: QCMToAdd.length,
        themesArray: this.themesArray
      }
      let dialogRef = this.dialog.open(ImportDialogComponent, dialogConfig);

        //When the modal is closed
      dialogRef.afterClosed().subscribe( action => {
        if(action) {
          if(action.themesArray) {
            this.themesArray = action.themesArray;
          }
          //If we have a commun theme, we add it to every question
          if(action.communTheme) {
            QCMToAdd.map((item, index) => {
              item.theme = action.communTheme;
            });
          }
          this.qcmContainer.qcm = this.qcmContainer.qcm.concat(QCMToAdd);
          this.file.updateJSON(this.qcmContainer).then(() => {
            //console.log("JSON updated")
          });
        }
      });
    });
  }

  handleOneQuestionOfImport(question:string) {
    let q = {
      "answers": [],
      "id": "",
      "isMultiple": false,
      "question": "",
     "theme": ""
    }
    question = question.split("\\end{reponses}")[0];
    let questionArray = question.split(/\r?\n/);
    questionArray.map((line, index) => {
      //get index of commentary
      let indexCom = line.indexOf("%");
      //Remove commentary if it exists
      if(indexCom != -1) {
        line = line.slice(0, indexCom); 
      }
      //Remove whitespace from both sides of the line
      line = line.trim();
      //Update array
      questionArray[index] = line;
    });
    //Remove all the empty string
    questionArray = questionArray.filter(function(item) { if(item) return true });
    //Remove the first element (useless)
    questionArray.shift();
    
    //Extraction of Id
    if(questionArray && questionArray[0] && questionArray[0].length >0) {
      let indexBeginId = questionArray[0].indexOf("{", 8);
      let indexEndId = questionArray[0].indexOf("}", indexBeginId);
      q.id = questionArray[0].slice(indexBeginId + 1 , indexEndId);
      if(questionArray[0].length > indexEndId + 1) {
        questionArray[0] = questionArray[0].slice(indexEndId + 1);
      } else {
        questionArray.shift();
      }
      //While we don't reach a \begin, we extract the question
      while(questionArray[0].indexOf("\\begin") == -1) {
        if(questionArray[0].charAt(0) != "\\") {
          q.question += " "  + questionArray[0];
        }
        questionArray.shift();
      }
      q.question = q.question.trim();
      //We shift the array until we reach a {reponses}
      while(questionArray.length > 0 && questionArray[0].indexOf("{reponses}") == -1) {
        questionArray.shift();
      }
      //We remove the \begin{responses}
      questionArray.shift();
      //console.log(questionArray);
      //We extract the answers
      let answersObject = [];
      questionArray.map((item, index) => {
        if(item.indexOf("bonne{") > -1) {
          answersObject.push({index: index, correct: true});
        } else if(item.indexOf("mauvaise{") > -1) {
          answersObject.push({index: index, correct: false});
        }
      });
      //console.log(answersObject);

      for(let i=0; i < answersObject.length; i++) {
        if(i < answersObject.length-1) {
          let answer = "";
          let endIndex = answersObject[i+1].index;
          for(let j = answersObject[i].index; j < endIndex; j++) {
            answer += " " + questionArray[j];
            //console.log(questionArray[j]);
          }
          if(answersObject[i].correct) {
            answer = answer.slice(8,-1).trim();
          } else {
            answer = answer.slice(11,-1).trim();
          }

          q.answers.push({answer: answer, correct: answersObject[i].correct});
        } else {
          let answer="";
          for(let j = answersObject[i].index; j < questionArray.length; j++) {
            answer += " " + questionArray[j];
          }
          if(answersObject[i].correct) {
            answer = answer.slice(8,-1).trim();
          } else {
            answer = answer.slice(11,-1).trim();
          }
          q.answers.push({answer: answer, correct: answersObject[i].correct});
        }
      }
      //console.log(q.answers);
      
      //Check if the question has multiple correct answer
      let nbCorrect = 0;
      q.answers.map((answer, index) => {
        if(answer.correct) { nbCorrect++ }
      });
      if(nbCorrect > 1) { q.isMultiple = true }

      return q;
      
    }
    
  }

  startExportation() {
    this.exportMode = true;
    document.querySelector(".exportContainer").classList.add("exportLeftAnim");
    document.querySelector(".qcmContainer").classList.add("qcmLeftAnim");
  }

  cancelExportation() {
    if(this.exportQCM.length > 0) {
      let cancelBottomSheet = this.bottomSheet.open(CancelExportationBottomSheetComponent);
      cancelBottomSheet.afterDismissed().toPromise().then((info) => {
        //console.log(info);
        if(info == "no") {
          this.allElements = [];
          this.exportQCM = [];
          this.exportMode = false;
          document.querySelector(".exportContainer").classList.remove("exportLeftAnim");
          document.querySelector(".qcmContainer").classList.remove("qcmLeftAnim");
        } else if(info =="yes") {
          this.exportMode = false;
          document.querySelector(".exportContainer").classList.remove("exportLeftAnim");
          document.querySelector(".qcmContainer").classList.remove("qcmLeftAnim");
        }
      });
    } else {
      this.exportMode = false;
      document.querySelector(".exportContainer").classList.remove("exportLeftAnim");
      document.querySelector(".qcmContainer").classList.remove("qcmLeftAnim");
    }
  }

  //Envoie un tableau d'entier à Electron pour créer le fichier d'exportation
  validExportation() {

    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(ExportTagDialogComponent, dialogConfig);
    //When the modal is closed
    dialogRef.afterClosed().subscribe( action => {
      if(action) {
        let offset = action.offset;
        for(let question of this.exportQCM) {
          let tag = action.tagName + "-" + offset;
          question.id = tag;
          offset++;
          //console.log(question);
        }
      }
      let wholeStringArray = [];
      let wholeString;
      for(let question of this.exportQCM) {
        wholeStringArray = wholeStringArray.concat(this.createStringArrayFromQuestion(question));
      }
      //We join the array to have a single String
      wholeString = wholeStringArray.join("");
      //We upload the text file and remove exportation interface
      this.file.exportQCM(wholeString).then(() => {
        this.exportQCM = [];
        this.exportMode = false;
        document.querySelector(".exportContainer").classList.remove("exportLeftAnim");
        document.querySelector(".qcmContainer").classList.remove("qcmLeftAnim");
      });
    });

  }

  createStringArrayFromQuestion(item) {
    let oneItemStringArray = ["%%%%%%%%%%%%\r\n", "\r\n", "\\element{"];
    if(item.element) {
      oneItemStringArray = oneItemStringArray.concat(item.element);
    }
    oneItemStringArray = oneItemStringArray.concat(["}{ \r\n", "\t\\begin{"]);
    if(item.isMultiple) {
      oneItemStringArray = oneItemStringArray.concat("questionmult}{" + item.id + "} \r\n");
    } else {
      oneItemStringArray = oneItemStringArray.concat("question}{" + item.id + "} \r\n");
    }
    oneItemStringArray = oneItemStringArray.concat("\t\t" + item.question + "\r\n \r\n \t\t\\begin{reponses} \r\n");
    for(let answer of item.answers) {
      if(answer.correct) {
        oneItemStringArray = oneItemStringArray.concat("\t\t\t\\bonne{" + answer.answer + "} \r\n\r\n");
      } else {
        oneItemStringArray = oneItemStringArray.concat("\t\t\t\\mauvaise{" + answer.answer + "} \r\n\r\n");
      }
    }
    oneItemStringArray = oneItemStringArray.concat("\t\t\\end{reponses} \r\n \t\\end{");
    if(item.isMultiple) {
      oneItemStringArray = oneItemStringArray.concat("questionmult} \r\n} \r\n\r\n");
    } else {
      oneItemStringArray = oneItemStringArray.concat("question} \r\n} \r\n\r\n");
    }
    return oneItemStringArray;
  }

  addAllQuestionsToExportation() {
    this.exportQCM = this.qcmContainer.qcm.slice();
  }

  filterQCMByTheme(theme) {
    return this.qcmContainer.qcm.filter(item => item.theme == theme);
  }
}
