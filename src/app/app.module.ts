import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*import the component we created*/
import { MathjaxComponent } from './components/mathjax/mathjax.component';

/*Angular Material items import*/
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';

//import differents dialogs
import { DeleteDialogComponent } from './pages/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from './pages/create-dialog/create-dialog.component';
import { CancelExportationBottomSheetComponent } from './pages/cancel-exportation-bottom-sheet/cancel-exportation-bottom-sheet.component';
import { ImportDialogComponent } from './pages/import-dialog/import-dialog.component';
import { ExportDialogComponent } from './pages/export-dialog/export-dialog.component';
import { ExportTagDialogComponent } from './pages/export-tag-dialog/export-tag-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MathjaxComponent,
    DeleteDialogComponent,
    CreateDialogComponent,
    CancelExportationBottomSheetComponent,
    ImportDialogComponent,
    ExportDialogComponent,
    ExportTagDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDividerModule,
    DragDropModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatChipsModule
  ],
  entryComponents: [DeleteDialogComponent,
    CreateDialogComponent,
    CancelExportationBottomSheetComponent,
    ImportDialogComponent,
    ExportDialogComponent,
    ExportTagDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
