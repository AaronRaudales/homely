import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesFavoritasComponent } from './propiedades-favoritas.component';

describe('PropiedadesFavoritasComponent', () => {
  let component: PropiedadesFavoritasComponent;
  let fixture: ComponentFixture<PropiedadesFavoritasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropiedadesFavoritasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadesFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
