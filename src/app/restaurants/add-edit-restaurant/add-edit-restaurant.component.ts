import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantApiService } from '../service/restaurant-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-restaurant',
  templateUrl: './add-edit-restaurant.component.html',
  styleUrls: ['./add-edit-restaurant.component.css']
})
export class AddEditRestaurantComponent implements OnInit {
  isEditMode: boolean = false;
  id!: string;
  restaurantForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
  });
  
  constructor(private api: RestaurantApiService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) =>{
      this.id = params.id;
      if(this.id) {
        this.isEditMode = true;
        this.api.getRestaurantById(this.id).subscribe(res =>{
          this.restaurantForm.patchValue(res);
        });
      } 
    })
  }

  save() {

    if(this.restaurantForm.invalid) {
      return;
    }

    if(this.isEditMode){
      this.api.updateRestaurant(this.restaurantForm.value, this.id).subscribe((res) => {
        this.toastr.success('Restaurant updated successfully!');
        setTimeout(()=>{
          this.router.navigate(['/restaurants']);
        },200) 
      },
      error => {
        this.toastr.error('Failed to update restaurant.'); 
      });
    }
    else{
      this.api.addRestaurant(this.restaurantForm.value).subscribe((res) => {
        this.toastr.success('Restaurant added successfully!'); 
        this.router.navigate(['/restaurants']);
      },
      error => {
        this.toastr.error('Failed to add restaurant.'); 
      });
    }
  }

  goToList(){
    this.router.navigate(['/restaurants']);
  }
  

}
