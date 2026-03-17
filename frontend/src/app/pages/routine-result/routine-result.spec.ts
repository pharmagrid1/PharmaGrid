import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineResult } from './routine-result';

describe('RoutineResult', () => {
  let component: RoutineResult;
  let fixture: ComponentFixture<RoutineResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
