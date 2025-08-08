import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show loader when loading is false', () => {
    component.loading = false;
    fixture.detectChanges();
    const loaderElement = fixture.nativeElement.querySelector('.loader-container');
    expect(loaderElement).toBeNull();
  });

  it('should show loader when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const loaderElement = fixture.nativeElement.querySelector('.loader-container');
    expect(loaderElement).toBeTruthy();
  });
}); 