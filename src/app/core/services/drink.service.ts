import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from '../models/drink.interface';

@Injectable({
  providedIn: 'root'
})
export class drinkService {
  private basic_convocation_info_url = 'http://127.0.0.1:8000/get/convocation/basic'; // Url para obtener la informacion basica de las convocatorias
  private detail_convocation_info_url = 'http://127.0.0.1:8000/get/convocation/detail';
  private filteredData: Drink[] = [];

  constructor(private http: HttpClient) { }

  getConvocations(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.basic_convocation_info_url);
  }

  getConvocationById(id: string | null): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.detail_convocation_info_url + '/' + id);
  }

  setFilteredData(data: Drink[]): void {
    this.filteredData = data;
  }

  getFilteredData(): Drink[] {
    return this.filteredData;
  }
}
