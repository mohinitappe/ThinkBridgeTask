import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantApiService {
 apiUrl: string= environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRestaurants(){
    return this.http.get(`${this.apiUrl}/restaurants`);
  }

  addRestaurant(data: any){
    return this.http.post(`${this.apiUrl}/restaurants`, data);
  }

  updateRestaurant(data: any, id: string){
    return this.http.put(`${this.apiUrl}/restaurants/${id}`, data);
  }

  getRestaurantById(id:string){
    return this.http.get(`${this.apiUrl}/restaurants/${id}`);
  }

  deleteRestaurantById(id: string){
    return this.http.delete(`${this.apiUrl}/restaurants/${id}`);
  }
}
