import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportTagDialogComponent } from './export-tag-dialog.component';

describe('ExportTagDialogComponent', () => {
  let component: ExportTagDialogComponent;
  let fixture: ComponentFixture<ExportTagDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportTagDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportTagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
