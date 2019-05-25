import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelExportationBottomSheetComponent } from './cancel-exportation-bottom-sheet.component';

describe('CancelExportationBottomSheetComponent', () => {
  let component: CancelExportationBottomSheetComponent;
  let fixture: ComponentFixture<CancelExportationBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelExportationBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelExportationBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
