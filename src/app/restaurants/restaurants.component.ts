import { Component, OnInit } from '@angular/core';
import { RestaurantApiService } from './service/restaurant-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurantList: any = [];

  constructor(private api: RestaurantApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getRestaurantList();
  }

  getRestaurantList() {
    this.api.getRestaurants().subscribe(res => {
      this.restaurantList = res;
    },
    error => {
      console.log(error);
    });
  }


  deleteRestaurant(id: string) {
    this.api.deleteRestaurantById(id).subscribe(res => { 
      this.toastr.success('Restaurant deleted successfully!');
      this.getRestaurantList();
    }, error => {
      this.toastr.success(error);
    })
  }

}
