import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuAddComponent } from './menu.add.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { drinkService } from '../../core/services/drink.service';
import { provideHttpClient } from '@angular/common/http';

describe('MenuAddComponent', () => {
  let component: MenuAddComponent;
  let fixture: ComponentFixture<MenuAddComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<MenuAddComponent>>;
  let mockDrinkService: jasmine.SpyObj<drinkService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDrinkService = jasmine.createSpyObj('drinkService', ['createDrinkMock']);
  
    await TestBed.configureTestingModule({
      imports: [FormsModule, MenuAddComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        provideHttpClient()
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(MenuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if the form is invalid', () => {
    const mockForm = {
      valid: false,
      value: {}
    } as NgForm;

    component.onSubmit(mockForm);
    expect(mockDrinkService.createDrinkMock).not.toHaveBeenCalled();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });
});