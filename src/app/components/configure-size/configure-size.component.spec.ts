import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSizeComponent } from './configure-size.component';

describe('ConfigureSizeComponent', () => {
  let component: ConfigureSizeComponent;
  let fixture: ComponentFixture<ConfigureSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
