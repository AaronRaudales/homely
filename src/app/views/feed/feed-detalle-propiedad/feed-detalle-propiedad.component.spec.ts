import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDetallePropiedadComponent } from './feed-detalle-propiedad.component';

describe('FeedDetallePropiedadComponent', () => {
  let component: FeedDetallePropiedadComponent;
  let fixture: ComponentFixture<FeedDetallePropiedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedDetallePropiedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedDetallePropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
