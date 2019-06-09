import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTabDialogComponent } from './delete-tab-dialog.component';

describe('DeleteTabDialogComponent', () => {
  let component: DeleteTabDialogComponent;
  let fixture: ComponentFixture<DeleteTabDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTabDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
