import { ComponentFixture, TestBed } from '@angular/core/testing';
import { menuListComponent } from './menu-list.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Drink } from '../../core/models/drink.interface';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('menuListComponent', () => {
  let component: menuListComponent;
  let fixture: ComponentFixture<menuListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [menuListComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        provideRouter([]), 
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(menuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with static data', () => {
    component.getStaticData();
    expect(component.menu.length).toBe(3);
    expect(component.menu[0].drink_name).toBe('Coca Cola');
  });

  it('should open the add modal and add a new drink', () => {
    const newDrink: Drink = { drink_name: 'Fanta', drink_size: '1 L', drink_price: 4000 };
    mockDialog.open.and.returnValue({
      afterClosed: () => of(newDrink)
    } as any);

    component.openAddModal();
    expect(component.menu.length).toBe(4);
    expect(component.menu[3]).toEqual(newDrink);
  });

  it('should not add a drink if modal is closed without data', () => {
    mockDialog.open.and.returnValue({
      afterClosed: () => of(null)
    } as any);

    component.openAddModal();
    expect(component.menu.length).toBe(3);
  });
});