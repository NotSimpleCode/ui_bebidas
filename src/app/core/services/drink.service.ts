import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from '../models/drink.interface';

@Injectable({
  providedIn: 'root'
})
export class drinkService {
  
  private menu_list_url = '/menu';
  private menu_list_get_name_url = '/menu/get';
  private menu_list_add_url = 'http://menu/add';

  constructor(private http: HttpClient) { }

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.menu_list_url);
  }

  getDrinkByName(name: string | null): Observable<Drink> {
    return this.http.get<Drink>(this.menu_list_get_name_url + '/' + name);
  }

  createDrink(newDrink: Drink) {
    return this.http.post(this.menu_list_add_url, newDrink)
  }

}
