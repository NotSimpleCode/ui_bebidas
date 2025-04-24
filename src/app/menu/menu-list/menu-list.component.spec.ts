import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuListComponent } from './menu-list.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Drink } from '../../core/models/drink.interface';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('MenuListComponent', () => {
  let component: MenuListComponent;
  let fixture: ComponentFixture<MenuListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [MenuListComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        provideRouter([]), 
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with static data', () => {
    component.getStaticData();
    expect(component.menu.length).toBe(3);
    expect(component.menu[0].name).toBe('Coca Cola');
  });

  it('should open the add modal and add a new drink', () => {
    const newDrink: Drink = { name: 'Fanta', size: '1 L', price: '4000' };
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