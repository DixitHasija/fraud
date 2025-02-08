import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiiFormComponent } from './pii-form.component';

describe('PiiFormComponent', () => {
  let component: PiiFormComponent;
  let fixture: ComponentFixture<PiiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiiFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
