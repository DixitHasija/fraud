import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiiListComponent } from './pii-list.component';

describe('PiiListComponent', () => {
  let component: PiiListComponent;
  let fixture: ComponentFixture<PiiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiiListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PiiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
