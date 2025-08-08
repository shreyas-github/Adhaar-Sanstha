import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have features array', () => {
    expect(component.features).toBeDefined();
    expect(component.features.length).toBeGreaterThan(0);
  });

  it('should have stats array', () => {
    expect(component.stats).toBeDefined();
    expect(component.stats.length).toBeGreaterThan(0);
  });

  it('should have hero images array', () => {
    expect(component.heroImages).toBeDefined();
    expect(component.heroImages.length).toBeGreaterThan(0);
  });
}); 