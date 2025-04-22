import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from '../models/drink.interface';

@Injectable({
  providedIn: 'root'
})
export class drinkService {
  
  private menu_list_url = 'https://api-bebidas.onrender.com/menu';

  constructor(private http: HttpClient) { }

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.menu_list_url);
  }

  getDrinkByName(name: string | null): Observable<Drink> {
    return this.http.get<Drink>(this.menu_list_url + '/' + name);
  }

  createDrink(newDrink: Drink) {
    return this.http.post(this.menu_list_url, newDrink)
  }

  createDrinkMock(newDrink: Drink): Observable<Drink> {
    return new Observable<Drink>((observer) => {
      setTimeout(() => {
        observer.next(newDrink);
        observer.complete();
      }, 1000); // Simulate a delay
    });
  }

}
