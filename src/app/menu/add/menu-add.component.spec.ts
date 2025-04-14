import { ComponentFixture, TestBed } from '@angular/core/testing';
import { menuAddComponent } from './menu.add.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { drinkService } from '../../core/services/drink.service';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('menuAddComponent', () => {
  let component: menuAddComponent;
  let fixture: ComponentFixture<menuAddComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<menuAddComponent>>;
  let mockDrinkService: jasmine.SpyObj<drinkService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDrinkService = jasmine.createSpyObj('drinkService', ['createDrinkMock']);
  
    await TestBed.configureTestingModule({
      imports: [FormsModule, menuAddComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        provideHttpClient()
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(menuAddComponent);
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