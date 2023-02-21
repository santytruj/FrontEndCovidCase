import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidForStateComponent } from './covid-for-state.component';

describe('CovidForStateComponent', () => {
  let component: CovidForStateComponent;
  let fixture: ComponentFixture<CovidForStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidForStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidForStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
