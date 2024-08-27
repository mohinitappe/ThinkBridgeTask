import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AddEditRestaurantComponent } from './restaurants/add-edit-restaurant/add-edit-restaurant.component';

const routes: Routes = [
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'add-restaurant', component: AddEditRestaurantComponent },
  { path: 'edit-restaurant/:id', component: AddEditRestaurantComponent },
  { path: '', redirectTo: 'restaurants', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
